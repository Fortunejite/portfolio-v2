import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Award, GraduationCap, Calendar, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { getAllCertifications, formatDateRange } from "@/lib/certifications";
import Certificate from "@/components/ui/Certificate";

export const metadata: Metadata = {
  title: "Certifications & Credentials | Fortune Jite",
  description:
    "Explore certifications, degrees, and academic qualifications achieved by Fortune Jite in Software Engineering and Computer Science.",
  openGraph: {
    title: "Certifications & Credentials - Fortune Jite",
    description:
      "Explore certifications, degrees, and academic qualifications achieved by Fortune Jite.",
  },
};

export default function CertificationsPage() {
  const certifications = getAllCertifications();

  return (
    <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
      {/* Background Animated Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/15 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-600/15 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/15 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-10 md:space-y-14">
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center space-x-2 px-4 py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-purple-400" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            Certifications & Education
          </h1>

          <p className="text-gray-300/80 text-base md:text-lg leading-relaxed">
            Formal qualifications, computer science degrees, and engineering completion certificates verifying technical expertise and continuous learning.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs md:text-sm font-medium">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300">Total Certifications:</span>
              <span className="text-white font-bold">{certifications.length}</span>
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
          {certifications.map((cert) => {
            const dateRange = formatDateRange(cert.start_date, cert.end_date);

            return (
              <div
                key={cert.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-linear-to-br from-slate-900/90 via-[#0a0a20]/90 to-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-purple-500/40 hover:shadow-purple-500/20 hover:-translate-y-1"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Certificate Preview Card Component */}
                <div className="p-5 md:p-6 space-y-5 z-10 flex flex-col flex-1">
                  <Certificate
                    certificate={cert.certificate}
                    institution={cert.institution}
                    id={cert.id}
                  />

                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/40">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                        <span>{cert.degree}</span>
                      </span>

                      {dateRange && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-gray-300 border border-white/10">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{dateRange}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                      {cert.institution}
                    </h3>

                    {cert.field && (
                      <p className="text-xs text-blue-300 font-medium">
                        Field of Study: <span className="text-white">{cert.field}</span>
                      </p>
                    )}

                    <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 mt-auto border-t border-white/10 flex items-center justify-between gap-3">
                    {cert.website ? (
                      <a
                        href={cert.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <span>Institution Website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-500 italic">No link</span>
                    )}

                    <Link
                      href={`/certifications/${cert.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border border-white/10"
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
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fortune Jite. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
