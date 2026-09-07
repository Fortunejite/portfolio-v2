import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import ProjectsFilterGrid from "@/components/ProjectsFilterGrid";

export const metadata: Metadata = {
  title: "Projects & Portfolio | Fortune Jite",
  description:
    "Explore full-stack web applications, freelance projects, and software systems built by Fortune Jite. Filter by freelance work or side projects.",
  openGraph: {
    title: "Projects & Portfolio - Fortune Jite",
    description:
      "Explore full-stack web applications, freelance projects, and software systems built by Fortune Jite.",
  },
};

export default async function ProjectsPage() {
  // Server-side fetching and pre-sorting (Freelance first, date descending second)
  const allProjects = getAllProjects();

  return (
    <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
      {/* Dynamic Background Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/15 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-600/15 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/15 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-10 md:space-y-14">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center space-x-2 px-4 py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-purple-400" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">

          <h1 className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            Featured Projects & Works
          </h1>

          <p className="text-gray-300/80 text-base md:text-lg leading-relaxed">
            A comprehensive showcase of production freelance applications delivered for clients and innovative side projects built with modern web technologies.
          </p>
        </div>

        {/* Filterable Projects Grid */}
        <ProjectsFilterGrid initialProjects={allProjects} />
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fortune Jite. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
