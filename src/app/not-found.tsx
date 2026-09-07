import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, FolderGit2, Home, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Fortune Jite",
  description: "The page or project resource you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background Ambient Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8 bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-linear-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 border border-purple-500/30 text-purple-300">
          <Compass className="w-4 h-4 text-purple-400" />
          <span>Error 404 — Navigation Lost</span>
        </div>

        {/* 404 Gradient Display */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-black tracking-widest bg-linear-to-r from-blue-400 via-purple-300 to-pink-400 bg-clip-text text-transparent opacity-90 drop-shadow-2xl">
            404
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xs" />
        </div>

        {/* Heading & Explanation */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Page Lost in Cyberspace
          </h2>
          <p className="text-gray-300/80 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            The page, project, or certificate you are looking for doesn&apos;t exist, may have been renamed, or is temporarily unavailable.
          </p>
        </div>

        {/* Quick Action Navigation Links */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-purple-500/25 scale-100 hover:scale-102 border border-purple-400/30"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <FolderGit2 className="w-4 h-4 text-blue-400" />
            <span>Browse Projects</span>
          </Link>

          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span>Certifications</span>
          </Link>
        </div>

        {/* Bottom Sparkle note */}
        <div className="pt-6 border-t border-white/10 text-xs text-gray-500 flex items-center justify-center gap-1.5">
          <span>Fortune Jite — Software Engineer Portfolio</span>
        </div>
      </div>
    </div>
  );
}
