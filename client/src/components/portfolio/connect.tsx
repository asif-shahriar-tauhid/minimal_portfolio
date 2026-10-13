"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Profile, SocialLink } from "@/lib/types";
import { sendContactMessage } from "@/lib/api";
import { toast } from "sonner";

interface ConnectSectionProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export function ConnectSection({ profile, socialLinks }: ConnectSectionProps) {
  const [copied, setCopied] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    body: "",
  });

  const handleCopyEmail = () => {
    if (!profile.email) return;
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.body) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await sendContactMessage(formData);
      if (res.ok) {
        toast.success(res.message);
        setFormData({ name: "", email: "", body: "" });
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      className="space-y-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800"
      id="connect"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
          Connect
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-lg">
          {profile.contactBlurb ||
            "Always open to interesting engineering challenges, software engineering internships, open-source collaborations, or discussing scalable system ideas."}
        </p>
      </div>

      {/* Direct Mail Row */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 space-y-3 shadow-2xs hover:shadow-xs transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Direct Mail
          </span>
          <a
            className="text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition inline-flex items-center gap-1"
            href={`mailto:${profile.email}`}
          >
            Compose message ↗
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <div className="font-mono text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span>{profile.email}</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 rounded transition flex items-center gap-1"
            >
              <span
                className={`text-[11px] font-sans border px-1.5 py-0.5 rounded transition ${
                  copied
                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 font-medium"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400"
                }`}
              >
                {copied ? "copied!" : "copy"}
              </span>
            </button>
          </div>
        </div>

        {/* Phone & WhatsApp Contact Options */}
        {(profile.phone || profile.whatsapp) && (
          <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-wrap gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            {profile.phone && (
              <div>
                <span className="text-neutral-400">Tel:</span>
                <a
                  className="hover:text-neutral-950 dark:hover:text-white transition ml-1"
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                >
                  {profile.phone}
                </a>
              </div>
            )}
            {profile.whatsapp && (
              <div>
                <span className="text-neutral-400">WhatsApp:</span>
                <a
                  className="hover:text-neutral-950 dark:hover:text-white transition ml-1"
                  href={`https://wa.me/${
                    profile.whatsapp.replace(/[^0-9]/g, "").startsWith("01")
                      ? `88${profile.whatsapp.replace(/[^0-9]/g, "")}`
                      : profile.whatsapp.replace(/[^0-9]/g, "")
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.whatsapp} ↗
                </a>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Quick Message Form */}
      <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
          Send A Direct Message
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                className="block text-[11px] font-mono text-neutral-500 mb-1"
                htmlFor="senderName"
              >
                Your Name
              </label>
              <input
                id="senderName"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 px-3 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label
                className="block text-[11px] font-mono text-neutral-500 mb-1"
                htmlFor="senderEmail"
              >
                Your Email
              </label>
              <input
                id="senderEmail"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 px-3 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-[11px] font-mono text-neutral-500 mb-1"
              htmlFor="messageBody"
            >
              Message
            </label>
            <textarea
              id="messageBody"
              rows={3}
              required
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Let's build something scalable..."
              className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 px-3 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-xs font-medium px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition disabled:opacity-50 inline-flex items-center gap-1.5 shadow-xs"
          >
            <span>{submitting ? "Dispatching..." : "Dispatch Message"}</span>
            <Send className="w-3 h-3" />
          </motion.button>
        </form>
      </div>

      {/* Network Footer Links */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-1 font-mono text-neutral-400">
          <span className="uppercase tracking-wider text-[11px]">Network</span>
          <span className="mx-1">•</span>
          <div className="flex flex-wrap items-center gap-3 text-neutral-600 dark:text-neutral-300">
            {socialLinks.map((s) => (
              <motion.a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1, color: "var(--foreground)" }}
                className="hover:text-neutral-950 dark:hover:text-white transition"
              >
                {s.label} ↗
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
