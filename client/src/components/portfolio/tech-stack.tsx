"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SkillCategory } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TechStackProps {
  categories: SkillCategory[];
}

export function TechStackSection({ categories }: TechStackProps) {
  return (
    <motion.section
      className="space-y-4"
      id="stack"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
          Tech Stack
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Technologies, frameworks, and tools that I build with. Hover on any skill to see proficiency.
        </p>
      </div>

      {/* Matrix Table with smooth Radix Tooltips */}
      <div className="border-t border-neutral-200/80 dark:border-neutral-800 divide-y divide-neutral-200/60 dark:divide-neutral-800/80 text-xs">
        {categories.map((cat, catIdx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: catIdx * 0.08 }}
            className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
          >
            <div className="w-28 text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 shrink-0">
              {cat.name}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-neutral-800 dark:text-neutral-200 flex-1">
              {cat.skills?.map((skill) => (
                <Tooltip key={skill.id}>
                  <TooltipTrigger asChild>
                    <motion.div
                      tabIndex={0}
                      role="button"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors duration-150 border border-neutral-200/70 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200 cursor-default select-none shadow-xs hover:shadow-sm"
                    >
                      {skill.icon && <span className="text-[12px]">{skill.icon}</span>}
                      <span className="font-medium text-xs">{skill.name}</span>

                      {/* Percentage badge with subtle accent on hover */}
                      <span className="ml-0.5 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {skill.level}%
                      </span>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={6}
                    className="z-50 bg-neutral-950 text-white dark:bg-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200 shadow-xl py-1.5 px-3 rounded-md pointer-events-none"
                  >
                    <div className="flex flex-col gap-1.5 text-[11px] font-mono min-w-[130px]">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-neutral-200 dark:text-neutral-800">
                          {skill.name}
                        </span>
                        <span className="text-emerald-400 dark:text-emerald-600 font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1 bg-neutral-800 dark:bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500 dark:bg-emerald-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
