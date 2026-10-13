"use client";

import { motion } from "framer-motion";
import { Education } from "@/lib/types";

interface EducationProps {
  educationList: Education[];
}

export function EducationSection({ educationList }: EducationProps) {
  if (!educationList || educationList.length === 0) return null;

  return (
    <motion.section
      className="space-y-4"
      id="education"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
          Educational Background
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Academic foundations in Computer Science and Engineering.
        </p>
      </div>

      <div className="space-y-3 pt-1">
        {educationList.map((edu, idx) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            whileHover={{ y: -2 }}
            className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 space-y-2 transition shadow-2xs hover:shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {edu.degree}
              </h3>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                {edu.startDate ? `${edu.startDate} – ` : ""}
                {edu.endDate || "Present"}
              </span>
            </div>

            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {edu.institution} {edu.location ? `• ${edu.location}` : ""}
              {edu.result ? ` (${edu.result})` : ""}
            </div>

            {edu.description && (
              <p className="text-[12.5px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {edu.description}
              </p>
            )}

            {edu.coursework && (
              <p className="text-[12.5px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong className="font-medium text-neutral-800 dark:text-neutral-200">
                  Core Coursework:
                </strong>{" "}
                {edu.coursework}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
