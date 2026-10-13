import Link from "next/link";
import { Profile } from "@/lib/types";

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-neutral-200/60 dark:border-neutral-800/80 py-8 text-xs text-neutral-500 dark:text-neutral-400">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          © {currentYear} {profile.name}. {profile.footerText || "Built with precision."}
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          {profile.resumeUrl && (
            <>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-950 dark:hover:text-white transition"
              >
                Resume ↗
              </a>
              <span>•</span>
            </>
          )}
          <a
            href="#projects"
            className="hover:text-neutral-950 dark:hover:text-white transition"
          >
            Projects
          </a>
          <span>•</span>
          <Link
            href="/dashboard"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
