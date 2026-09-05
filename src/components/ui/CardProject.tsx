import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({
  id,
  image,
  name,
  description,
  type,
  website,
}: {
  id: number;
  image: string;
  name: string;
  description: string;
  type: string;
  website: string;
}) => {
  const formattedType = type
    ? type.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "";

  return (
    <div className="group relative w-full">
            
      <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
    
        <div className="relative p-5 z-10">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1536px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-semibold bg-linear-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                {name}
              </h3>
              {formattedType && (
                <span className="rounded-md border border-purple-400/25 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-100">
                  {formattedType}
                </span>
              )}
            </div>
            
            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
            
            <div className="pt-4 flex items-center justify-between">
              {website ? (
                <a
                href={website}
                  target="_blank"
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm">Demo Not Available</span>
              )}
              
     

              <Link
                href={`/projects/${id}`}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <span className="text-sm font-medium">Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
