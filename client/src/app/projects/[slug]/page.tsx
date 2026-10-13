import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Layers, AlertCircle, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { getProjectBySlug } from "@/lib/api";
import { initialPortfolioData } from "@/lib/mock-data";

export async function generateStaticParams() {
  return initialPortfolioData.projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `https://asiftauhid.me/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Asif Shahriar Tauhid`,
      description: project.summary,
      url: `https://asiftauhid.me/projects/${project.slug}`,
      images: project.imageUrl ? [{ url: project.imageUrl, alt: project.title }] : [],
    },
  };
}

export const instant = false;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen py-10 px-5 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <Link
            href="/"
            className="hover:text-neutral-900 dark:hover:text-white transition"
          >
            Home
          </Link>
        </div>

        {/* Project Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              {project.title}
            </h1>
            {project.category && (
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                {project.category}
              </span>
            )}
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {project.summary}
          </p>

          {/* Quick CTA Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Live Demonstration</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition inline-flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <span className="text-[10px]">↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Screenshot */}
        {project.imageUrl && (
          <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm">
            <img
              src={project.imageUrl}
              alt={`${project.title} Interface Screenshot`}
              className="w-full h-64 sm:h-80 object-cover object-top"
            />
          </div>
        )}

        {/* Technology Stack */}
        <section className="space-y-3 p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
            <Layers className="w-4 h-4 text-blue-500" />
            <span>Main Technology Stack</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
            {project.techStack?.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/70 dark:border-neutral-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Detailed Description */}
        <section className="space-y-3 p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Brief Description &amp; Architecture
          </h2>
          <p className="text-[13.5px] text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </section>

        {/* Challenges Faced */}
        <section className="space-y-3 p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-4 h-4" />
            <span>Challenges Faced While Developing</span>
          </div>
          <p className="text-[13.5px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {project.challenges}
          </p>
        </section>

        {/* Potential Improvements & Future Plans */}
        <section className="space-y-3 p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>Potential Improvements &amp; Future Plans</span>
          </div>
          <p className="text-[13.5px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {project.improvements}
          </p>
        </section>

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-xs font-mono">
          <Link
            href="/projects"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            ← Return to all projects archive
          </Link>
          <a
            href="mailto:asifshahriartauhid@gmail.com"
            className="hover:text-neutral-900 dark:hover:text-white transition"
          >
            Discuss this project ↗
          </a>
        </div>
      </div>
    </div>
  );
}
