/** Shapes returned by the portfolio API (mirrors server/prisma/schema.prisma). */

export interface Profile {
  id: number;
  name: string;
  alias: string | null;
  designation: string;
  location: string | null;
  isAvailable: boolean;
  availabilityText: string;
  heroIntro: string;
  photoUrl: string | null;
  resumeUrl: string | null;
  aboutParagraphs: string[];
  highlights: string[];
  email: string;
  phone: string | null;
  whatsapp: string | null;
  contactBlurb: string | null;
  footerText: string | null;
  updatedAt: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  showInHero: boolean;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  icon: string | null;
  level: number;
  order: number;
  categoryId: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  order: number;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl: string | null;
  location: string | null;
  employment: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  highlights: string[];
  technologies: string[];
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  result: string | null;
  description: string | null;
  coursework: string | null;
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  summary: string;
  imageUrl: string | null;
  description: string;
  techStack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  challenges: string;
  improvements: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface Portfolio {
  profile: Profile | null;
  socialLinks: SocialLink[];
  skillCategories: SkillCategory[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
}

export interface Stats {
  projects: number;
  skills: number;
  experiences: number;
  education: number;
  messages: number;
  unread: number;
}

/** Uniform result for server actions consumed by client forms. */
export type ActionResult<T = unknown> =
  | { ok: true; data?: T }
  | { ok: false; error: string; issues?: { path: string; message: string }[] };
