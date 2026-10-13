"use client";

import { motion } from "framer-motion";
import { Profile } from "@/lib/types";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <motion.section
      className="space-y-4"
      id="about"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <h2 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
        Who Am I
      </h2>

      <div className="text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-3.5">
        {profile.aboutParagraphs?.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      {/* Quick Highlights Chips */}
      {profile.highlights && profile.highlights.length > 0 && (
        <div className="pt-2 flex flex-wrap gap-2 text-xs">
          {profile.highlights.map((h, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.05, y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 font-medium cursor-default shadow-2xs hover:shadow-xs select-none"
            >
              {h}
            </motion.span>
          ))}
        </div>
      )}
    </motion.section>
  );
}
