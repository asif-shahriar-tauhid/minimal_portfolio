import { z } from "zod";

/** Empty strings from HTML forms become null for optional columns. */
const optionalText = z
  .string()
  .trim()
  .transform((v) => (v === "" ? null : v))
  .nullish();

const optionalUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || /^(https?:\/\/|mailto:|tel:|\/)/i.test(v), "Must be a valid URL")
  .transform((v) => (v === "" ? null : v))
  .nullish();

const requiredText = z.string().trim().min(1, "Required");
const stringList = z.array(z.string().trim()).transform((list) => list.filter(Boolean)).default([]);
const order = z.coerce.number().int().default(0);

export const profileSchema = z.object({
  name: requiredText,
  alias: optionalText,
  designation: requiredText,
  location: optionalText,
  isAvailable: z.boolean().default(true),
  availabilityText: z.string().trim().default("Available for work"),
  heroIntro: requiredText,
  photoUrl: optionalUrl,
  resumeUrl: optionalUrl,
  aboutParagraphs: stringList,
  highlights: stringList,
  email: z.email(),
  phone: optionalText,
  whatsapp: optionalText,
  contactBlurb: optionalText,
  footerText: optionalText,
});

export const socialLinkSchema = z.object({
  label: requiredText,
  url: z
    .string()
    .trim()
    .regex(/^(https?:\/\/|mailto:|tel:)/i, "Must start with https://, mailto: or tel:"),
  showInHero: z.boolean().default(true),
  order,
});

export const skillCategorySchema = z.object({
  name: requiredText,
  order,
});

export const skillSchema = z.object({
  name: requiredText,
  icon: optionalText,
  level: z.coerce.number().int().min(0).max(100).default(70),
  categoryId: requiredText,
  order,
});

export const experienceSchema = z.object({
  role: requiredText,
  company: requiredText,
  companyUrl: optionalUrl,
  location: optionalText,
  employment: optionalText,
  startDate: requiredText,
  endDate: optionalText,
  description: optionalText,
  highlights: stringList,
  technologies: stringList,
  order,
});

export const educationSchema = z.object({
  degree: requiredText,
  institution: requiredText,
  location: optionalText,
  startDate: optionalText,
  endDate: optionalText,
  result: optionalText,
  description: optionalText,
  coursework: optionalText,
  order,
});

export const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes"),
  title: requiredText,
  category: optionalText,
  summary: requiredText,
  imageUrl: optionalUrl,
  description: requiredText,
  techStack: stringList,
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  challenges: requiredText,
  improvements: requiredText,
  featured: z.boolean().default(true),
  order,
});

export const featuredProjectsSchema = z.object({
  projectIds: z.array(z.string().min(1)).max(3, "You can select at most 3 featured projects"),
});

export const messageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.email("Enter a valid email"),
  body: z.string().trim().min(5, "Message is too short").max(5000),
});

export const messageUpdateSchema = z.object({ read: z.boolean() });

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});
