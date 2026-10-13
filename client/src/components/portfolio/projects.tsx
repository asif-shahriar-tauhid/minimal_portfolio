"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { CodeBracketIcon } from "@/components/icons";
import { Project } from "@/lib/types";

interface ProjectsSectionProps {
  projects: Project[];
  onOpenProjectModal: (project: Project) => void;
}

export function ProjectsSection({ projects, onOpenProjectModal }: ProjectsSectionProps) {
  // Keep only the latest 3 projects in this section
  const latestProjects = projects.slice(0, 3);

  return (
    <motion.section
      className="space-y-6"
      id="projects"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-baseline justify-between border-b border-neutral-200/80 dark:border-neutral-800 pb-3">
        <div>
          <h2 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Software products, open source tools, and experiments.
          </p>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Showing 3 of {projects.length}
        </span>
      </div>

      <div className="space-y-8">
        {latestProjects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -3 }}
            className="group relative rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4 sm:p-5 hover:border-neutral-300 dark:hover:border-neutral-700 transition shadow-xs hover:shadow-md space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <button
                  type="button"
                  onClick={() => onOpenProjectModal(project)}
                  className="text-[15px] font-bold text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition text-left flex items-center gap-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                >
                  <span>{project.title}</span>
                  <span className="text-xs text-neutral-400">↗</span>
                </button>
                {project.category && (
                  <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200/60 dark:border-blue-900/50">
                    {project.category}
                  </span>
                )}
              </div>

              {/* Action Buttons: Modal, Dedicated Page, Code */}
              <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                <button
                  type="button"
                  onClick={() => onOpenProjectModal(project)}
                  className="hover:text-neutral-900 dark:hover:text-white transition underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" /> Quick View
                </button>

                <Link
                  href={`/projects/${project.slug}`}
                  className="hover:text-neutral-900 dark:hover:text-white transition underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 flex items-center gap-1"
                >
                  Details <span className="text-[10px]">↗</span>
                </Link>

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

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.summary}
            </p>

            {/* Screenshot Preview */}
            {project.imageUrl && (
              <div
                onClick={() => onOpenProjectModal(project)}
                className="overflow-hidden rounded-lg border border-neutral-200/70 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 cursor-pointer"
              >
                <img
                  src={project.imageUrl}
                  alt={`${project.title} Screenshot Preview`}
                  className="w-full h-48 sm:h-56 object-cover object-top group-hover:scale-[1.015] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}

            {/* Stack Tags & Bottom CTA Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-neutral-100 dark:border-neutral-800">
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                {project.techStack?.join(" • ")}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* View More Projects CTA Button */}
      <motion.div
        className="pt-2 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition shadow-xs hover:shadow-sm"
        >
          <span>View More Projects</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 group-hover:text-blue-500 transition-all" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
