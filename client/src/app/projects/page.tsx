import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/api";
import { ProjectsArchive } from "@/components/portfolio/projects-archive";

export const metadata: Metadata = {
  title: "All Projects — Asif Shahriar Tauhid",
  description:
    "Explore the complete catalog of full-stack applications, scalable distributed systems, and open-source software built by Asif Shahriar Tauhid.",
  alternates: {
    canonical: "https://asiftauhid.me/projects",
  },
  openGraph: {
    title: "All Projects — Asif Shahriar Tauhid",
    description:
      "Explore the complete catalog of full-stack applications, scalable distributed systems, and open-source software built by Asif Shahriar Tauhid.",
    url: "https://asiftauhid.me/projects",
    siteName: "Asif Shahriar Tauhid — Portfolio",
    type: "website",
  },
};

export const instant = false;

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b]" />}>
      <ProjectsArchive initialProjects={projects} />
    </Suspense>
  );
}
