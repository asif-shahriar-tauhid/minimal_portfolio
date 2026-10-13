"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Project } from "@/lib/types";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto no-scrollbar p-4 sm:p-6 md:p-10 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#111113] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-6 my-auto max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Top Modal Navigation */}
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white inline-flex items-center gap-1 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1 text-neutral-400 hover:text-neutral-950 dark:hover:text-white rounded-md transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                  {project.title}
                </h2>
                {project.category && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                    {project.category}
                  </span>
                )}
              </div>

              {/* Project Screenshot */}
              {project.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} Interface`}
                    className="w-full h-56 sm:h-72 object-cover object-top"
                  />
                </div>
              )}

              {/* Problem & Context */}
              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Problem &amp; Context
                </h4>
                <p className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Core Features & Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Core Features &amp; Architecture
                </h4>
                <p className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Full Tech Stack */}
              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Full Categorized Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1 text-xs font-mono">
                  {project.techStack?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Challenges */}
              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Technical Challenges Faced
                </h4>
                <p className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.challenges}
                </p>
              </div>

              {/* Future Roadmap */}
              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Future Roadmap &amp; Improvements
                </h4>
                <p className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.improvements}
                </p>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-xs font-medium px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition inline-flex items-center gap-1.5"
                  >
                    <span>Live Demonstration</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.a>
                )}

                {project.repoUrl && (
                  <motion.a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-xs font-medium px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition inline-flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub Repository</span>
                    <span className="text-[10px]">↗</span>
                  </motion.a>
                )}

                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition ml-auto inline-flex items-center gap-1"
                >
                  Open Dedicated Page →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
