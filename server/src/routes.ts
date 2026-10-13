import { Router } from "express";
import { requireAdmin, signToken, verifyCredentials } from "./auth.ts";
import { crudRouter, wrap } from "./crud.ts";
import { prisma } from "./db.ts";
import {
  educationSchema,
  experienceSchema,
  loginSchema,
  messageSchema,
  messageUpdateSchema,
  profileSchema,
  projectSchema,
  skillCategorySchema,
  skillSchema,
  socialLinkSchema,
} from "./schemas.ts";

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
