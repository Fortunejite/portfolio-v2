import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
  Database,
  Calendar,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import {
  getAllProjects,
  getProjectById,
  getAdjacentProjects,
  formatDateRange,
  Project,
} from "@/lib/projects";
import GithubButton from "@/components/GithubButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Next.js Server Generation Feature: SSG Static Params Pre-rendering
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    id: String(project.id),
  }));
}

// Next.js Server Generation Feature: Dynamic Dynamic Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found | Fortune Jite",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.name} | Project Details`,
    description: project.short_description,
    openGraph: {
      title: `${project.name} - Fortune Jite Portfolio`,
      description: project.short_description,
      images: [project.image],
    },
  };
}

import { getTechIcon } from "@/lib/techIcons";

const TechBadge = ({ tech }: { tech: string }) => {
  const Icon = getTechIcon(tech);

  return (
    <div className="group relative overflow-hidden px-3.5 py-2.5 bg-linear-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/15 hover:border-blue-500/35 transition-all duration-300">
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-2">
        <Icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }: { feature: string }) => {
  return (
    <li className="group flex items-start space-x-3 p-3 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-1.5 shrink-0">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-2 h-2 rounded-full bg-linear-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors leading-relaxed">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }: { project: Project }) => {
  const techStackCount = project.technologies.length;
  const featuresCount = project.features.length;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-4 bg-[#0a0a1a] rounded-2xl border border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-3 bg-white/5 p-3 md:p-4 rounded-xl border border-blue-500/20 transition-all duration-300 hover:scale-102 hover:border-blue-500/40">
        <div className="bg-blue-500/20 p-2 md:p-2.5 rounded-xl">
          <Code2 className="text-blue-300 w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-lg md:text-2xl font-bold text-blue-200">{techStackCount}</div>
          <div className="text-[11px] md:text-xs text-gray-400">Total Technologies</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-3 bg-white/5 p-3 md:p-4 rounded-xl border border-purple-500/20 transition-all duration-300 hover:scale-102 hover:border-purple-500/40">
        <div className="bg-purple-500/20 p-2 md:p-2.5 rounded-xl">
          <Layers className="text-purple-300 w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-lg md:text-2xl font-bold text-purple-200">{featuresCount}</div>
          <div className="text-[11px] md:text-xs text-gray-400">Key Features</div>
        </div>
      </div>
    </div>
  );
};

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const { prevProject, nextProject } = getAdjacentProjects(id);
  const isFreelance = project.type === "freelance-project";
  const dateRange = formatDateRange(project.start_date, project.end_date);

  return (
    <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse" />
        <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-12">
          <Link
            href="/projects"
            className="group inline-flex items-center space-x-2 px-4 py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-purple-400" />
            <span>All Projects</span>
          </Link>

          <div className="flex items-center space-x-2 text-xs md:text-sm text-white/50 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="text-white/90 font-medium truncate max-w-37.5 md:max-w-62.5">
              {project.name}
            </span>
          </div>
        </div>

        {/* Project Header Info */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left Column: Information */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              {/* Type and Date Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
                    isFreelance
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-950/50"
                      : "bg-purple-950/80 text-purple-300 border-purple-500/40 shadow-lg shadow-purple-950/50"
                  }`}
                >
                  {isFreelance ? (
                    <>
                      <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Freelance Project</span>
                    </>
                  ) : (
                    <>
                      <Code className="w-3.5 h-3.5 text-purple-400" />
                      <span>Side Project</span>
                    </>
                  )}
                </span>

                {dateRange && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{dateRange}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                {project.name}
              </h1>

              <div className="relative h-1 w-20 md:w-28">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-xs" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-base md:text-lg text-gray-300/90 leading-relaxed font-normal">
                {project.long_description || project.short_description}
              </p>
            </div>

            {/* Stats Component */}
            <ProjectStats project={project} />

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-2 px-5 md:px-8 py-3 md:py-4 bg-linear-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 backdrop-blur-xl text-sm md:text-base font-semibold shadow-lg shadow-blue-500/10"
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform text-blue-400" />
                  <span>Live Demo</span>
                </a>
              )}

              <GithubButton githubUrl={project.github} />
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-lg md:text-xl font-semibold text-white/90 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span>Technologies Used</span>
              </h3>
              {project.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {project.technologies.map((tech, index) => (
                    <TechBadge key={index} tech={tech} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 opacity-50">No technologies listed.</p>
              )}
            </div>
          </div>

          {/* Right Column: Screenshot & Features */}
          <div className="space-y-8">
            {/* Project Image Box using Next.js Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-slate-900/50">
              <div className="relative aspect-video w-full">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-[#030014] via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
            </div>

            {/* Key Features Box */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white/90 flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Key Features & Capabilities</span>
              </h3>
              {project.features.length > 0 ? (
                <ul className="space-y-1">
                  {project.features.map((feature, index) => (
                    <FeatureItem key={index} feature={feature} />
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 opacity-50">No features listed.</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Adjacent Navigation */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="group p-4 md:p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Previous Project
              </span>
              <span className="text-base md:text-lg font-bold text-white group-hover:text-purple-200 mt-2 truncate">
                {prevProject.name}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="group p-4 md:p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between text-right items-end sm:col-start-2"
            >
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                Next Project
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-base md:text-lg font-bold text-white group-hover:text-blue-200 mt-2 truncate">
                {nextProject.name}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Page Footer */}
      <footer className="mt-16 border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fortune Jite. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
