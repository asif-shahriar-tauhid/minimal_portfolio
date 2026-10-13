"use client";

import * as React from "react";
import { Portfolio, Project } from "@/lib/types";
import { Navbar } from "./navbar";
import { HeroSection } from "./hero";
import { AboutSection } from "./about";
import { ProjectsSection } from "./projects";
import { ExperienceSection } from "./experience";
import { TechStackSection } from "./tech-stack";
import { EducationSection } from "./education";
import { ConnectSection } from "./connect";
import { Footer } from "./footer";
import { ProjectModal } from "./project-modal";
import { TerminalModal } from "./terminal-modal";

interface PortfolioClientProps {
  initialData: Portfolio;
}

export function PortfolioClient({ initialData }: PortfolioClientProps) {
  const [terminalOpen, setTerminalOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  const profile = initialData.profile;

  return (
    <>
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      <main className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 pt-12 pb-24 space-y-20">
        {profile && (
          <HeroSection
            profile={profile}
            socialLinks={initialData.socialLinks}
          />
        )}

        {profile && <AboutSection profile={profile} />}

        <ProjectsSection
          projects={initialData.projects}
          onOpenProjectModal={(p) => setSelectedProject(p)}
        />

        <ExperienceSection experiences={initialData.experiences} />

        <TechStackSection categories={initialData.skillCategories} />

        <EducationSection educationList={initialData.education} />

        {profile && (
          <ConnectSection
            profile={profile}
            socialLinks={initialData.socialLinks}
          />
        )}
      </main>

      {profile && <Footer profile={profile} />}

      {/* Interactive Modal Overlays */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      <TerminalModal
        portfolio={initialData}
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}
