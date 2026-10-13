interface Milestone {
  year: string;
  description: string;
}

const defaultMilestones: Milestone[] = [
  {
    year: "2026",
    description: "Targeting engineering internship & enterprise distributed systems.",
  },
  {
    year: "2025",
    description: "Architecting full-stack systems with PostgreSQL, Redis caching & real-time websockets.",
  },
  {
    year: "2024",
    description: "Shipped Red Humanity & Swift Connect platforms; specialized in Next.js & Express.",
  },
  {
    year: "2023",
    description: "Built complex RESTful APIs, relational schema models, and interactive React SPAs.",
  },
  {
    year: "2022",
    description: "Enrolled in B.Sc. in CSE program; deeply mastered Data Structures & Algorithms in C/C++.",
  },
  {
    year: "2021",
    description: "Completed Higher Secondary (HSC Science); solved algorithmic puzzles and CLI utilities.",
  },
];

export function MilestonesSection() {
  return (
    <section className="space-y-4" id="milestones">
      <div>
        <h2 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
          Journey &amp; Milestones
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Engineering progression and key highlights across each phase.
        </p>
      </div>

      <div className="space-y-2 pt-1 font-mono text-xs">
        {defaultMilestones.map((m) => (
          <div
            key={m.year}
            className="flex items-center justify-between p-3 rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-white/50 dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-neutral-400 dark:text-neutral-500 font-medium">
                {m.year}
              </span>
              <span className="font-sans text-[13px] font-semibold text-neutral-800 dark:text-neutral-200">
                {m.description}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-1.5 py-0.5 rounded">
              &lt;/&gt;
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
