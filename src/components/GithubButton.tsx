'use client';

import React from 'react';
import { Github, Lock } from 'lucide-react';
import Swal from 'sweetalert2';

interface GithubButtonProps {
  githubUrl: string;
  className?: string;
}

export default function GithubButton({ githubUrl, className = "" }: GithubButtonProps) {
  const isPrivate = githubUrl === 'private' || !githubUrl;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (isPrivate) {
      e.preventDefault();
      Swal.fire({
        icon: 'info',
        title: 'Source Code Private',
        text: 'Sorry, the source code for this project is private as it was built for a client or commercial use.',
        confirmButtonText: 'Got it',
        confirmButtonColor: '#8b5cf6',
        background: '#0a0a1e',
        color: '#ffffff',
        customClass: {
          popup: 'border border-purple-500/30 rounded-2xl shadow-2xl backdrop-blur-xl',
          title: 'text-xl font-bold bg-linear-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent',
          confirmButton: 'px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/25',
        }
      });
    }
  };

  if (isPrivate) {
    return (
      <button
        onClick={handleClick}
        type="button"
        className={`group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-linear-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base cursor-pointer ${className}`}
      >
        <div className="absolute inset-0 translate-y-full bg-linear-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
        <Lock className="relative w-4 h-4 md:w-5 md:h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
        <span className="relative font-medium">GitHub (Private)</span>
      </button>
    );
  }

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-linear-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base ${className}`}
    >
      <div className="absolute inset-0 translate-y-full bg-linear-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
      <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
      <span className="relative font-medium">GitHub</span>
    </a>
  );
}
