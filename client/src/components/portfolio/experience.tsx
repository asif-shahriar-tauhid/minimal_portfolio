"use client";

import { motion } from "framer-motion";
import { Experience } from "@/lib/types";
import { ExternalLink } from "lucide-react";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <motion.section
      className="space-y-4"
      id="experience"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
          Professional Experience
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Hands-on software development roles, engineering contributions, and shipped solutions.
        </p>
      </div>

      <div className="space-y-3.5 pt-1">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            whileHover={{ y: -2 }}
            className="p-4 sm:p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 space-y-2.5 transition shadow-2xs hover:shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {exp.role}
                </span>
                <span className="text-xs text-neutral-400">•</span>
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5"
                  >
                    {exp.company}
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ) : (
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {exp.company}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                {exp.startDate} – {exp.endDate || "Present"}
              </span>
            </div>

            {(exp.location || exp.employment) && (
              <div className="text-xs text-neutral-500 font-mono">
                {[exp.location, exp.employment].filter(Boolean).join(" • ")}
              </div>
            )}

            {exp.description && (
              <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {exp.description}
              </p>
            )}

            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1 list-disc list-inside">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}

            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                {exp.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
