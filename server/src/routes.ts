import { Router } from "express";
import { z } from "zod";
import { requireAdmin, signToken, verifyCredentials } from "./auth";
import { crudRouter, wrap } from "./crud";
import { prisma } from "./db";
import {
  educationSchema,
  experienceSchema,
  featuredProjectsSchema,
  loginSchema,
  messageSchema,
  messageUpdateSchema,
  profileSchema,
  projectSchema,
  skillCategorySchema,
  skillSchema,
  socialLinkSchema,
} from "./schemas";

export const api = Router();

/* ───────────── Auth ───────────── */

api.post(
  "/auth/login",
  wrap(async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);
    if (!verifyCredentials(email, password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ token: signToken(email) });
  }),
);

api.get("/auth/me", requireAdmin, (_req, res) => {
  res.json({ email: res.locals.admin.sub });
});

/* ───────────── Aggregated public payload ───────────── */

api.get(
  "/portfolio",
  wrap(async (_req, res) => {
    const [profile, socialLinks, skillCategories, experiences, education, projects] =
      await Promise.all([
        prisma.profile.findUnique({ where: { id: 1 } }),
        prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
        prisma.skillCategory.findMany({
          orderBy: { order: "asc" },
          include: { skills: { orderBy: { order: "asc" } } },
        }),
        prisma.experience.findMany({ orderBy: { order: "asc" } }),
        prisma.education.findMany({ orderBy: { order: "asc" } }),
        prisma.project.findMany({ orderBy: { order: "asc" } }),
      ]);

    res.json({ profile, socialLinks, skillCategories, experiences, education, projects });
  }),
);

/* ───────────── Profile (singleton) ───────────── */

api.get(
  "/profile",
  wrap(async (_req, res) => {
    res.json(await prisma.profile.findUnique({ where: { id: 1 } }));
  }),
);

api.put(
  "/profile",
  requireAdmin,
  wrap(async (req, res) => {
    const data = profileSchema.parse(req.body);
    res.json(
      await prisma.profile.upsert({
        where: { id: 1 },
        create: { id: 1, ...data },
        update: data,
      }),
    );
  }),
);

/* ───────────── Projects (also addressable by slug) ───────────── */

api.get(
  "/projects/slug/:slug",
  wrap(async (req, res) => {
    const project = await prisma.project.findUnique({ where: { slug: req.params.slug as string } });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  }),
);

api.put(
  "/projects/featured",
  requireAdmin,
  wrap(async (req, res) => {
    const { projectIds } = featuredProjectsSchema.parse(req.body);

    await prisma.$transaction(async (tx) => {
      // Unfeature any project not in the list
      await tx.project.updateMany({
        where: { id: { notIn: projectIds } },
        data: { featured: false },
      });

      // Feature the selected projects with sequential order (0 = top/latest)
      // and stagger updatedAt so index 0 is latest
      const now = Date.now();
      for (let i = 0; i < projectIds.length; i++) {
        await tx.project.update({
          where: { id: projectIds[i] },
          data: {
            featured: true,
            order: i,
            updatedAt: new Date(now - i * 1000),
          },
        });
      }
    });

    const updatedProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    res.json(updatedProjects);
  }),
);

api.patch(
  "/projects/:id/featured",
  requireAdmin,
  wrap(async (req, res) => {
    const id = req.params.id as string;
    const { featured } = z.object({ featured: z.boolean() }).parse(req.body);

    if (featured) {
      const currentFeatured = await prisma.project.findMany({
        where: { featured: true, id: { not: id } },
        orderBy: { order: "asc" },
      });

      if (currentFeatured.length >= 3) {
        return res.status(400).json({
          error: "You can feature a maximum of 3 projects. Please unfeature a project first.",
        });
      }

      // Feature this project and place it at the top as the latest (order: 0)
      await prisma.$transaction(async (tx) => {
        for (let i = 0; i < currentFeatured.length; i++) {
          await tx.project.update({
            where: { id: currentFeatured[i].id },
            data: { order: i + 1 },
          });
        }
        await tx.project.update({
          where: { id },
          data: {
            featured: true,
            order: 0,
            updatedAt: new Date(),
          },
        });
      });
    } else {
      await prisma.project.update({
        where: { id },
        data: { featured: false },
      });
    }

    const updated = await prisma.project.findUnique({ where: { id } });
    res.json(updated);
  }),
);

api.use("/projects", crudRouter({ delegate: prisma.project, schema: projectSchema }));

/* ───────────── Other sections ───────────── */

api.use("/social-links", crudRouter({ delegate: prisma.socialLink, schema: socialLinkSchema }));
api.use(
  "/skill-categories",
  crudRouter({
    delegate: prisma.skillCategory,
    schema: skillCategorySchema,
    include: { skills: { orderBy: { order: "asc" } } },
  }),
);
api.use("/skills", crudRouter({ delegate: prisma.skill, schema: skillSchema }));
api.use("/experiences", crudRouter({ delegate: prisma.experience, schema: experienceSchema }));
api.use("/education", crudRouter({ delegate: prisma.education, schema: educationSchema }));

/* ───────────── Contact messages ───────────── */

api.post(
  "/messages",
  wrap(async (req, res) => {
    const data = messageSchema.parse(req.body);
    const message = await prisma.message.create({ data });
    res.status(201).json({ id: message.id });
  }),
);

api.get(
  "/messages",
  requireAdmin,
  wrap(async (_req, res) => {
    res.json(await prisma.message.findMany({ orderBy: { createdAt: "desc" } }));
  }),
);

api.patch(
  "/messages/:id",
  requireAdmin,
  wrap(async (req, res) => {
    const data = messageUpdateSchema.parse(req.body);
    res.json(await prisma.message.update({ where: { id: req.params.id as string }, data }));
  }),
);

api.delete(
  "/messages/:id",
  requireAdmin,
  wrap(async (req, res) => {
    await prisma.message.delete({ where: { id: req.params.id as string } });
    res.status(204).end();
  }),
);

/* ───────────── Dashboard stats ───────────── */

api.get(
  "/stats",
  requireAdmin,
  wrap(async (_req, res) => {
    const [projects, skills, experiences, education, messages, unread] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.message.count(),
      prisma.message.count({ where: { read: false } }),
    ]);
    res.json({ projects, skills, experiences, education, messages, unread });
  }),
);
