"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#stack" },
    { label: "Connect", href: "#connect" },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fafafa]/85 dark:bg-[#09090b]/85 border-b border-neutral-200/60 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        {/* Monogram Logo */}
        <Link
          href="#hero"
          aria-label="Asif Tauhid Homepage"
          className="group flex items-center gap-2 focus:outline-none"
        >
          <motion.svg
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-9 h-9 text-blue-600 dark:text-blue-500"
            fill="none"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path
                d="M22 74 C26 48, 38 22, 50 18 C58 15, 63 21, 56 38 C49 53, 38 72, 32 78 C27 83, 21 80, 26 68 C30 58, 41 54, 58 52"
                strokeWidth="4.5"
              />
              <path
                d="M58 52 C70 51, 78 44, 76 34 C74 25, 62 27, 54 36 C44 48, 66 59, 64 71 C62 80, 48 83, 38 77"
                strokeWidth="4.5"
              />
              <path
                d="M42 28 C56 26, 74 23, 86 21 M62 25 C62 36, 61 58, 62 76 C62 82, 65 85, 72 82"
                strokeWidth="4.5"
              />
              <circle cx="84" cy="21" fill="currentColor" r="2.5" stroke="none" />
            </g>
          </motion.svg>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-[13px] font-normal text-neutral-500 dark:text-neutral-400">
          {navLinks.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -1, color: "var(--foreground)" }}
              transition={{ duration: 0.15 }}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Right Header Tools: Theme Toggle, CLI Terminal, Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <motion.button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </motion.button>

          {/* CLI Terminal Button */}
          {onOpenTerminal && (
            <motion.button
              type="button"
              onClick={onOpenTerminal}
              aria-label="Open Interactive CLI"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2.5 py-1.5 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center gap-1.5"
            >
              <span>&gt;_</span>
            </motion.button>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 md:hidden text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg border border-neutral-200 dark:border-neutral-800"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 space-y-2 text-sm">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
