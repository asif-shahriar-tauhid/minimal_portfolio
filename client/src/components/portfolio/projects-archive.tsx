"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  X,
  ExternalLink,
  Eye,
  Moon,
  Sun,
  Layers,
  Sparkles,
} from "lucide-react";
import { CodeBracketIcon, GithubIcon } from "@/components/icons";
import { Project } from "@/lib/types";
import { ProjectModal } from "./project-modal";

interface ProjectsArchiveProps {
  initialProjects: Project[];
}

export function ProjectsArchive({ initialProjects }: ProjectsArchiveProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Compute all unique categories across projects
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialProjects]);

  // Filter projects based on search query and category
  const filteredProjects = React.useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.category?.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchSummary = project.summary.toLowerCase().includes(q);
      const matchCategory = project.category?.toLowerCase().includes(q);
      const matchTech = project.techStack?.some((t) => t.toLowerCase().includes(q));

      return matchTitle || matchSummary || matchCategory || matchTech;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fafafa]/85 dark:bg-[#09090b]/85 border-b border-neutral-200/60 dark:border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#connect"
              className="hidden sm:inline-flex text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
            >
              Get in Touch
            </Link>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition text-neutral-700 dark:text-neutral-300"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/30 text-[11px] font-mono text-blue-600 dark:text-blue-400">
            <Sparkles className="w-3 h-3" />
            <span>Complete Collection Archive</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>{initialProjects.length} Projects</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            All Projects & Systems
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            A comprehensive catalog of production web platforms, distributed systems, full-stack tools, and algorithmic experiments engineered by Asif Shahriar Tauhid.
          </p>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="space-y-4"
        >
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tech stack (e.g. Next.js, PostgreSQL), or keyword..."
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition border ${
                    active
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white font-medium shadow-xs"
                      : "bg-white dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-1 border-b border-neutral-200/70 dark:border-neutral-800 pb-3">
            <span>
              Showing {filteredProjects.length} of {initialProjects.length} projects
            </span>
            {(searchQuery || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Reset filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Projects Cards List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 px-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3"
              >
                <Layers className="w-8 h-8 text-neutral-400 mx-auto" />
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  No projects match your search
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try tweaking your search keywords or switching category filters to view all projects.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                >
                  Reset all filters
                </button>
              </motion.div>
            ) : (
              filteredProjects.map((project, idx) => (
                <motion.article
                  key={project.id || project.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="group relative rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 sm:p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition shadow-xs hover:shadow-md space-y-4"
                >
                  {/* Card Header: Title, Category, Action Links */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition text-left flex items-center gap-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      >
                        <span>{project.title}</span>
                        <span className="text-xs text-neutral-400">↗</span>
                      </button>

                      {project.category && (
                        <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200/60 dark:border-blue-900/50">
                          {project.category}
                        </span>
                      )}

                      {project.featured && (
                        <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200/60 dark:border-amber-900/50">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="hover:text-neutral-900 dark:hover:text-white transition underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> Quick View
                      </button>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-neutral-900 dark:hover:text-white transition underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 flex items-center gap-1"
                      >
                        <span>Case Study</span>
                        <span className="text-[10px]">↗</span>
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-neutral-900 dark:hover:text-white transition flex items-center gap-1"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-neutral-900 dark:hover:text-white transition flex items-center gap-1"
                        >
                          <span>Code</span>
                          <CodeBracketIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Screenshot Preview */}
                  {project.imageUrl && (
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="overflow-hidden rounded-lg border border-neutral-200/70 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 cursor-pointer"
                    >
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} Screenshot Preview`}
                        className="w-full h-48 sm:h-64 object-cover object-top group-hover:scale-[1.012] transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Tech Stack Chips & Action Link */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition"
                      >
                        <span>Full Details</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/60 dark:border-neutral-800/80 py-8 px-5 sm:px-6 mt-16">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © 2026 Asif Shahriar Tauhid. Built with precision.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/#projects" className="hover:text-neutral-900 dark:hover:text-white transition">
              Home Projects
            </Link>
            <span>•</span>
            <Link href="/#connect" className="hover:text-neutral-900 dark:hover:text-white transition">
              Contact
            </Link>
            <span>•</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-neutral-900 dark:hover:text-white transition"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Quick View Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
