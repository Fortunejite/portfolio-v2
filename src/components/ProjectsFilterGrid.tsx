'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight, Search, Calendar, Briefcase, Code, Filter } from 'lucide-react';
import { Project, formatDateRange } from '@/lib/projects';
import { getTechIcon } from '@/lib/techIcons';

interface ProjectsFilterGridProps {
  initialProjects: Project[];
}

export default function ProjectsFilterGrid({ initialProjects }: ProjectsFilterGridProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'freelance-project' | 'side-project'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const counts = useMemo(() => {
    const freelance = initialProjects.filter((p) => p.type === 'freelance-project').length;
    const side = initialProjects.filter((p) => p.type === 'side-project').length;
    return {
      all: initialProjects.length,
      freelance,
      side,
    };
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Category filter
      if (activeFilter !== 'all' && project.type !== activeFilter) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = project.name.toLowerCase().includes(query);
        const descMatch = project.short_description.toLowerCase().includes(query);
        const techMatch = project.technologies.some((t) => t.toLowerCase().includes(query));
        return nameMatch || descMatch || techMatch;
      }

      return true;
    });
  }, [initialProjects, activeFilter, searchQuery]);

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Controls Header: Search & Category Filter Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/5 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-white/10 shadow-2xl">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30 scale-102'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>All Projects</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-300'}`}>
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('freelance-project')}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeFilter === 'freelance-project'
                ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/30 scale-102'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>Freelance Projects</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeFilter === 'freelance-project' ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-300'}`}>
              {counts.freelance}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('side-project')}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeFilter === 'side-project'
                ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30 scale-102'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-purple-400" />
            <span>Side Projects</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeFilter === 'side-project' ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-300'}`}>
              {counts.side}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-60 md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => {
            const isFreelance = project.type === 'freelance-project';
            const dateRange = formatDateRange(project.start_date, project.end_date);

            return (
              <div
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-linear-to-br from-slate-900/90 via-[#0a0a20]/90 to-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-purple-500/40 hover:shadow-purple-500/20 hover:-translate-y-1.5"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Card Thumbnail Container */}
                <div className="relative w-full aspect-video overflow-hidden bg-black/40">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a20]/50 from-0% via-transparent via-20% to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-end gap-2 z-10">
                    {dateRange && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-gray-300 backdrop-blur-md border border-white/10">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{dateRange}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-5 md:p-6 z-10 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between gap-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-300">
                      {project.name}
                    </h3>
                    {isFreelance && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950/50">
                        <Briefcase className="w-3 h-3 text-emerald-400" />
                        <span>Freelance</span>
                      </span>
                    )}
                    {!isFreelance && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-950/50">
                        <Code className="w-3 h-3 text-purple-400" />
                        <span>Side Project</span>
                      </span>
                    )}
                    </div>
                    <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-3">
                      {project.short_description}
                    </p>
                  </div>

                  {/* Tech stack pill preview */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech, idx) => {
                      const Icon = getTechIcon(tech);
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 text-blue-300/90 border border-blue-500/10 group-hover:border-blue-500/20 transition-colors"
                        >
                          <Icon className="w-3 h-3 text-blue-400" />
                          <span>{tech}</span>
                        </span>
                      );
                    })}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-lg text-[11px] font-medium bg-white/5 text-gray-400 border border-white/5">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 mt-auto border-t border-white/10 flex items-center justify-between gap-3">
                    {project.website ? (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors py-1.5"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-500 italic">No Demo</span>
                    )}

                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border border-white/10"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white/5 rounded-2xl border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-gray-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">No projects found</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            We couldn&apos;t find any projects matching your current filter or search criteria. Try clearing your search query.
          </p>
          <button
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-xl text-xs font-semibold transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
