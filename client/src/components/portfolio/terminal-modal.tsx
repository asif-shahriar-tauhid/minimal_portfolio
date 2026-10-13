"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Portfolio } from "@/lib/types";

interface TerminalModalProps {
  portfolio: Portfolio;
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  id: string;
  cmd: string;
  html: string;
}

export function TerminalModal({ portfolio, isOpen, onClose }: TerminalModalProps) {
  const router = useRouter();
  const [history, setHistory] = React.useState<CommandOutput[]>([]);
  const [inputVal, setInputVal] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputVal.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    setInputVal("");

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "exit") {
      onClose();
      return;
    }

    let outputHtml = "";
    switch (cmd) {
      case "help":
        outputHtml = `
          <div class="space-y-1 text-neutral-300">
            <div><span class="text-amber-400 font-semibold">skills</span>    - View primary technical stack</div>
            <div><span class="text-amber-400 font-semibold">projects</span>  - List featured software applications</div>
            <div><span class="text-amber-400 font-semibold">contact</span>   - Display direct mail & phone contacts</div>
            <div><span class="text-amber-400 font-semibold">resume</span>    - Open resume link</div>
            <div><span class="text-amber-400 font-semibold">whoami</span>    - Quick biography synopsis</div>
            <div><span class="text-amber-400 font-semibold">site</span>      - Show official portfolio domain</div>
            <div><span class="text-amber-400 font-semibold">admin</span>     - Go to dashboard login</div>
            <div><span class="text-amber-400 font-semibold">clear</span>     - Clear terminal display</div>
            <div><span class="text-amber-400 font-semibold">exit</span>      - Close this terminal session</div>
          </div>
        `;
        break;

      case "site":
      case "domain":
        outputHtml = `<div>Official Domain: <a href="https://asiftauhid.me" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline font-semibold">https://asiftauhid.me</a></div>`;
        break;

      case "skills":
        outputHtml = portfolio.skillCategories
          .map(
            (c) =>
              `<div class="mb-1"><span class="text-cyan-400 font-semibold">${c.name}:</span> ${c.skills
                .map((s) => s.name)
                .join(", ")}</div>`
          )
          .join("");
        break;

      case "projects":
        outputHtml = `
          <div class="space-y-1">
            ${portfolio.projects
              .map(
                (p, idx) =>
                  `<div>${idx + 1}. <strong class="text-white">${p.title}</strong> — ${p.summary} <span class="text-blue-400 font-mono">[${p.techStack.slice(0, 3).join(", ")}]</span></div>`
              )
              .join("")}
          </div>
        `;
        break;

      case "contact":
        outputHtml = `
          <div>Email: <a href="mailto:${portfolio.profile?.email}" class="text-blue-400 underline">${portfolio.profile?.email}</a></div>
          <div>Phone: ${portfolio.profile?.phone || "N/A"} | WhatsApp: ${portfolio.profile?.whatsapp || "N/A"}</div>
        `;
        break;

      case "resume":
        if (portfolio.profile?.resumeUrl) {
          window.open(portfolio.profile.resumeUrl, "_blank");
          outputHtml = `Opening resume link in new tab...`;
        } else {
          outputHtml = `Resume URL not configured.`;
        }
        break;

      case "whoami":
        outputHtml = `<div><strong>${portfolio.profile?.name}</strong> [${portfolio.profile?.alias || "dev"}] — ${portfolio.profile?.designation} in ${portfolio.profile?.location}.</div>`;
        break;

      case "admin":
        router.push("/dashboard");
        outputHtml = `Redirecting to /dashboard...`;
        break;

      default:
        outputHtml = `<span class="text-rose-400">Command not recognized: '${raw}'. Type <span class="text-amber-400 font-bold">'help'</span> for available commands.</span>`;
    }

    setHistory((prev) => [
      ...prev,
      { id: Math.random().toString(), cmd: raw, html: outputHtml },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-full max-w-xl bg-neutral-950 text-neutral-100 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden font-mono text-xs flex flex-col h-[430px]"
          >
            {/* Terminal Window Bar */}
            <div className="px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  onClick={onClose}
                  className="w-2.5 h-2.5 rounded-full bg-rose-500/80 cursor-pointer hover:opacity-80 transition"
                  title="Close"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] text-neutral-400">
                  tauhid@system: ~ (bash)
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white text-xs"
              >
                × ESC
              </button>
            </div>

            {/* Terminal Output Body */}
            <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3 select-text text-neutral-300 leading-relaxed">
              <div>
                Welcome to developer shell v2.5. Type{" "}
                <span className="text-amber-400 font-semibold">&apos;help&apos;</span> for
                available commands.
              </div>

              {history.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <span className="text-emerald-400">guest@tauhid:~$</span>
                    <span className="text-white">{item.cmd}</span>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.html }}
                    className="pl-2 border-l border-neutral-800"
                  />
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Line */}
            <form
              onSubmit={handleCommand}
              className="p-3 bg-neutral-900/60 border-t border-neutral-800 flex items-center gap-2"
            >
              <span className="text-emerald-400 font-medium">guest@tauhid:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="help, skills, projects, resume, clear..."
                autoComplete="off"
                spellCheck="false"
                className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none focus:ring-0 p-0 font-mono placeholder-neutral-600"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
