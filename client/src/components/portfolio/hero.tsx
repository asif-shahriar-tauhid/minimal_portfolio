"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Profile, SocialLink } from "@/lib/types";
import { toast } from "sonner";

interface HeroSectionProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!profile.resumeUrl || profile.resumeUrl === "#") {
      e.preventDefault();
      toast.info("Resume is being updated. Feel free to contact via email!");
    }
  };

  return (
    <motion.section
      className="pt-2"
      id="hero"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-6 sm:gap-8">
        {/* Left Hero Details */}
        <div className="space-y-3.5 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <motion.h1
              className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {profile.name}
            </motion.h1>
            {profile.alias && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800"
              >
                {profile.alias}
              </motion.span>
            )}
          </div>

          <motion.p
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {profile.designation}
          </motion.p>

          <motion.div
            className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {profile.location && <span>{profile.location}</span>}
            {profile.location && <span className="text-neutral-300 dark:text-neutral-700">•</span>}
            {profile.isAvailable && (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {profile.availabilityText || "Available for work"}
              </span>
            )}
          </motion.div>

          {/* Hero Narrative Copy */}
          <motion.p
            className="text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-400 pt-1 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {profile.heroIntro}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="pt-3 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1 text-xs font-medium px-3.5 py-1.5 rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-sm"
            >
              <span>View My Projects</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </motion.a>

            <motion.a
              href={profile.resumeUrl || "#"}
              onClick={handleResumeClick}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
              <span className="text-[10px] text-neutral-400">↗</span>
            </motion.a>
          </motion.div>

          {/* Social Quick Links */}
          <motion.div
            className="pt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            {socialLinks
              .filter((item) => item.showInHero)
              .map((item) => (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -1, color: "var(--foreground)" }}
                  className="hover:text-neutral-950 dark:hover:text-white transition inline-flex items-center gap-0.5"
                >
                  {item.label} <span className="text-[10px]">↗</span>
                </motion.a>
              ))}
            {profile.email && (
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ y: -1, color: "var(--foreground)" }}
                className="hover:text-neutral-950 dark:hover:text-white transition inline-flex items-center gap-0.5"
              >
                Email <span className="text-[10px]">↗</span>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Right Side Avatar */}
        <motion.div
          className="flex-shrink-0 self-start"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 200 }}
        >
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative p-1 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-sm group"
          >
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={`Portrait of ${profile.name}`}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover object-top grayscale group-hover:grayscale-0 transition duration-300"
                loading="eager"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-xl text-neutral-500">
                AT
              </div>
            )}
            <div className="absolute -bottom-1.5 -right-1.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 p-1 rounded-md text-[9px] font-mono shadow-sm">
              dev
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
