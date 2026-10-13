/**
 * Seeds the database with the real scraped data from https://asiftauhid.vercel.app/
 * Everything here is fully editable from /dashboard.
 * Safe to re-run: wipes section tables and recreates them.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.ts";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  console.log("🌱 Starting seed with scraped data...");

  await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      name: "Asif Shahriar Tauhid",
      alias: "aka [AT]",
      designation: "Full Stack Developer",
      location: "Dhaka, Bangladesh",
      isAvailable: true,
      availabilityText: "Available for work",
      heroIntro:
        "Full Stack Developer with a strong passion for building scalable, user-focused applications. Working with React, Next.js, Node.js, Express, MongoDB, and PostgreSQL.",
      photoUrl: "https://i.ibb.co.com/N6hpS06K/Gemini-Generated-Image-og2dtnog2dtnog2d.webp",
      resumeUrl: "https://drive.google.com/file/d/1cftQuhy0wNb3ROWkDteVxtgMo3EfxYoT/view?usp=sharing",
      aboutParagraphs: [
        "I am a Computer Science student and aspiring Full-Stack Developer with a strong passion for building scalable, user-focused applications. My primary focus is modern web development, where I work with JavaScript, React, Node.js, Express.js, MongoDB, and PostgreSQL while continuously expanding my knowledge of backend systems and software architecture.",
        "Beyond learning new technologies, I enjoy understanding how systems work under the hood, solving complex problems, and developing projects from the ground up. I regularly strengthen my programming fundamentals through data structures and algorithms, version control with Git, and hands-on development.",
        "My long-term goal is to become a skilled software engineer who builds reliable, efficient, and impactful software, contributes to open-source projects, and continuously learns emerging technologies.",
      ],
      highlights: [
        "Coding",
        "Reading Tech Blogs",
        "Gaming",
        "Photography",
      ],
      email: "asifshahriartauhid@gmail.com",
      phone: "+8801937165042",
      whatsapp: "01937165042",
      contactBlurb:
        "Always open to interesting engineering challenges, software engineering internships, open-source collaborations, or discussing scalable system ideas.",
      footerText: "Built with precision.",
    },
    create: {
      id: 1,
      name: "Asif Shahriar Tauhid",
      alias: "aka [AT]",
      designation: "Full Stack Developer",
      location: "Dhaka, Bangladesh",
      isAvailable: true,
      availabilityText: "Available for work",
      heroIntro:
        "Full Stack Developer with a strong passion for building scalable, user-focused applications. Working with React, Next.js, Node.js, Express, MongoDB, and PostgreSQL.",
      photoUrl: "https://i.ibb.co.com/N6hpS06K/Gemini-Generated-Image-og2dtnog2dtnog2d.webp",
      resumeUrl: "https://drive.google.com/file/d/1cftQuhy0wNb3ROWkDteVxtgMo3EfxYoT/view?usp=sharing",
      aboutParagraphs: [
        "I am a Computer Science student and aspiring Full-Stack Developer with a strong passion for building scalable, user-focused applications. My primary focus is modern web development, where I work with JavaScript, React, Node.js, Express.js, MongoDB, and PostgreSQL while continuously expanding my knowledge of backend systems and software architecture.",
        "Beyond learning new technologies, I enjoy understanding how systems work under the hood, solving complex problems, and developing projects from the ground up. I regularly strengthen my programming fundamentals through data structures and algorithms, version control with Git, and hands-on development.",
        "My long-term goal is to become a skilled software engineer who builds reliable, efficient, and impactful software, contributes to open-source projects, and continuously learns emerging technologies.",
      ],
      highlights: [
        "Coding",
        "Reading Tech Blogs",
        "Gaming",
        "Photography",
      ],
      email: "asifshahriartauhid@gmail.com",
      phone: "+8801937165042",
      whatsapp: "01937165042",
      contactBlurb:
        "Always open to interesting engineering challenges, software engineering internships, open-source collaborations, or discussing scalable system ideas.",
      footerText: "Built with precision.",
    },
  });

  // Wipe & recreate list sections
  await prisma.$transaction([
    prisma.socialLink.deleteMany(),
    prisma.skillCategory.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.education.deleteMany(),
    prisma.project.deleteMany(),
  ]);

  // Social Links
  await prisma.socialLink.createMany({
    data: [
      { label: "GitHub", url: "https://github.com/asif-shahriar-tauhid", showInHero: true, order: 0 },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/asif-tauhid/", showInHero: true, order: 1 },
      { label: "X", url: "https://x.com/monkeyluffy003b", showInHero: true, order: 2 },
      { label: "Facebook", url: "https://www.facebook.com/asifshahriar.tauhid", showInHero: true, order: 3 },
    ],
  });

  // Skills categorized with exact percentages from scraped site
  const skillsData: Record<string, [string, string | null, number][]> = {
    Frontend: [
      ["HTML", "🌐", 95],
      ["React", "⚛️", 90],
      ["TypeScript", "TS", 90],
      ["TailwindCSS", "🌀", 90],
      ["Framer-Motion", "✨", 90],
      ["JavaScript", "JS", 85],
      ["NextJS", "▲", 70],
    ],
    Backend: [
      ["PostgreSQL", "🐘", 90],
      ["MySQL", "🐬", 90],
      ["NodeJS", "🟢", 80],
      ["Express", "🚂", 80],
      ["PrismaORM", "💎", 80],
      ["MongoDB", "🍃", 80],
    ],
    Tools: [
      ["Git", "📦", 95],
      ["Github", "🐙", 95],
      ["Browser Devtools", "🛠️", 87],
      ["Prettier", "✨", 80],
      ["npm", "📦", 80],
      ["Eslint", "🔍", 80],
    ],
  };

  let categoryOrder = 0;
  for (const [name, list] of Object.entries(skillsData)) {
    await prisma.skillCategory.create({
      data: {
        name,
        order: categoryOrder++,
        skills: {
          create: list.map(([skill, icon, level], order) => ({
            name: skill,
            icon,
            level,
            order,
          })),
        },
      },
    });
  }

  // Experience
  await prisma.experience.createMany({
    data: [
      {
        role: "Moderator-Web Group.",
        company: "NSU ACM Student Chapter.",
        companyUrl: "https://nsusc.acm.org/",
        location: "Dhaka, Bangladesh",
        employment: "Student Community / Leadership",
        startDate: "March 2026",
        endDate: "Present",
        description:
          "Collaborated with a team of students to design and develop the official club flagship event landing page.",
        highlights: [
          "Collaborated with a student engineering team to design and ship the flagship event landing page.",
          "Coordinated web group activities, code reviews, and frontend development initiatives.",
        ],
        technologies: ["React", "Tailwind CSS", "JavaScript", "Git"],
        order: 0,
      },
      {
        role: "Open Source Contributor & Self-Taught Developer",
        company: "Frontend Journey",
        companyUrl: "https://github.com/asif-shahriar-tauhid",
        location: "Remote",
        employment: "Independent",
        startDate: "August 2025",
        endDate: "Present",
        description:
          "Built multiple full-stack and frontend applications utilizing modern tools like React, Tailwind CSS, and Firebase. Consistently solved algorithmic problems and pushed code to GitHub to maintain an active learning streak. Mastered modern developer workflows including version control, responsive design, and local storage state management.",
        highlights: [
          "Built multiple full-stack and frontend applications utilizing modern tools like React, Tailwind CSS, and Firebase.",
          "Consistently solved algorithmic problems and pushed code to GitHub to maintain an active learning streak.",
          "Mastered modern developer workflows including version control, responsive design, and state management.",
        ],
        technologies: ["React", "TypeScript", "Node.js", "Express", "Firebase", "PostgreSQL", "Tailwind CSS"],
        order: 1,
      },
    ],
  });

  // Education
  await prisma.education.createMany({
    data: [
      {
        degree: "BSc in CSE",
        institution: "North South University",
        location: "Dhaka, Bangladesh",
        startDate: "2024",
        endDate: "Present",
        result: "Undergraduate",
        description: "Pursuing Bachelor of Science in Computer Science & Engineering.",
        coursework:
          "Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Discrete Mathematics",
        order: 0,
      },
      {
        degree: "Higher Secondary Certificate - HSC",
        institution: "Govt. Science College",
        location: "Dhaka, Bangladesh",
        startDate: "2019",
        endDate: "2021",
        result: "GPA - 5.00",
        description:
          "Science Group. Focused on Higher Mathematics, Physics, Chemistry, and Information & Communication Technology (ICT).",
        coursework: "Higher Mathematics, Physics, Chemistry, ICT",
        order: 1,
      },
      {
        degree: "Secondary School Certificate - SSC",
        institution: "Safiuddin Sarker Academy and College",
        location: "Gazipur, Bangladesh",
        startDate: "2017",
        endDate: "2019",
        result: "GPA - 5.00",
        description: "Science Group. Completed secondary school education with perfect GPA 5.00.",
        coursework: "General Science, Mathematics, English, Information Technology",
        order: 2,
      },
    ],
  });

  // Projects
  await prisma.project.createMany({
    data: [
      {
        slug: "rentnest",
        title: "RentNest",
        category: "Property Rental Platform",
        summary:
          "Comprehensive property rental platform with Next.js App Router, React 19, and Tailwind CSS v4 featuring role-tailored dashboards for Admin, Landlord, and Tenant.",
        imageUrl:
          "https://res.cloudinary.com/j39tyctx/image/upload/f_auto,q_auto/Annotation_2026-08-03_180157_pzqk85",
        description:
          "RentNest is a comprehensive, state-of-the-art frontend application designed to power a modern property rental platform. Built with the Next.js App Router, React 19, TypeScript, and Tailwind CSS v4, it offers tailored experiences for different user roles (Admin, Landlord, Tenant) through highly interactive and responsive dashboards. Features include rental listing management, dynamic booking workflows, integrated payment gateway with Stripe, and real-time dashboard analytics.",
        techStack: [
          "Next.js",
          "React 19",
          "TypeScript",
          "Tailwind CSS v4",
          "Node.js",
          "Express",
          "PostgreSQL",
          "Prisma",
          "Stripe",
          "Framer Motion",
          "Shadcn UI",
          "Zod",
        ],
        liveUrl: "https://rentnest-teal.vercel.app/",
        repoUrl: "https://github.com/asif-shahriar-tauhid/RentNest-Frontend",
        challenges:
          "Designing multi-role dynamic dashboards with responsive navigation while ensuring real-time synchronized rental booking state and secure payment flows via Stripe.",
        improvements:
          "Integrating 360-degree virtual property tours with Three.js, automated digital lease agreements with e-signatures, and instant landlord-tenant messaging webhooks.",
        featured: true,
        order: 0,
      },
      {
        slug: "pulsecity",
        title: "PulseCity",
        category: "Event Discovery & Booking",
        summary:
          "Interactive event discovery web app featuring Firebase authentication, protected booking routes, dynamic event listings, and a sleek dark-mode interface.",
        imageUrl: "https://i.ibb.co.com/76gCHtQ/pulse.png",
        description:
          "PulseCity Event Explorer is a React + Vite web app for discovering events, viewing details, and creating local booking records after login.\n\nKey Highlights:\n- Firebase authentication (email/password + Google OAuth)\n- Protected routes for event details, user profiles, and dashboard\n- Event listing from dynamic feeds with upcoming and trending sections\n- Interactive event details page with local reservation forms\n- User profile management for display name and avatar updates\n- Sleek dark-themed UI engineered with Tailwind CSS v4, DaisyUI, AOS, Swiper, and Gooey Toast.",
        techStack: [
          "React",
          "Vite",
          "React Router",
          "Firebase",
          "Tailwind CSS",
          "AOS",
          "Swiper",
          "Lucide React",
          "DaisyUI",
        ],
        liveUrl: "https://pulsecity-event-explorer.web.app/",
        repoUrl:
          "https://github.com/Erenshoyo/PulseCity-Event-Explorer/commit/ae736799530c6ae5f16ed568a52bd6c27b796653",
        challenges:
          "Managing asynchronous authentication state transitions smoothly across protected reservation routes and integrating Swiper touch gestures with AOS scroll animations.",
        improvements:
          "Live seat reservation layout mapping, QR-code ticket scanning for event organizers, and native Google Calendar / iCal integration.",
        featured: true,
        order: 1,
      },
      {
        slug: "lifeos",
        title: "LifeOS",
        category: "Productivity Platform",
        summary:
          "Premium, offline-first productivity platform replacing fragmented tools with an intentional, editorial-grade dashboard for tasks, habits, and focus.",
        imageUrl: "https://i.ibb.co.com/TMX68h1b/lifeos.png",
        description:
          "Life OS is a premium, offline-first productivity platform that replaces the chaos of juggling multiple apps with one calm, editorial-grade dashboard. It integrates tasks, habits, journaling, goals, and deep-focus tools into a single intentional system with smooth micro-interactions, responsive charts, and Three.js ambient visual components.",
        techStack: [
          "Next.js",
          "TypeScript",
          "Three.js",
          "Recharts",
          "Shadcn UI",
          "Tailwind CSS",
          "Framer Motion",
          "Lucide Icons",
          "Clsx",
        ],
        liveUrl: "https://lifeos-es.netlify.app",
        repoUrl: "https://github.com/Erenshoyo/LifeOS",
        challenges:
          "Balancing offline-first persistent client state with high-performance animations and Three.js canvas rendering while maintaining 60 FPS interactions.",
        improvements:
          "End-to-end encrypted multi-device cloud synchronization, AI-powered habit analysis and daily journaling summaries, and offline PWA desktop installation.",
        featured: true,
        order: 2,
      },
    ],
  });

  console.log("🌱 Seed complete! Scraped portfolio successfully seeded into PostgreSQL.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
