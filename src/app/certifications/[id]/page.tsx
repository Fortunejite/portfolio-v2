import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  GraduationCap,
  Calendar,
  ExternalLink,
  ChevronRight,
  Award,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import {
  getAllCertifications,
  getCertificationById,
  getAdjacentCertifications,
  formatDateRange,
} from "@/lib/certifications";
import Certificate from "@/components/ui/Certificate";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Next.js SSG Pre-rendering for certification routes
export async function generateStaticParams() {
  const certs = getAllCertifications();
  return certs.map((cert) => ({
    id: String(cert.id),
  }));
}

// Next.js Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const cert = getCertificationById(id);

  if (!cert) {
    return {
      title: "Certification Not Found | Fortune Jite",
      description: "The requested certification could not be found.",
    };
  }

  return {
    title: `${cert.institution} - ${cert.degree} | Fortune Jite`,
    description: cert.description,
    openGraph: {
      title: `${cert.institution} - Certification Details`,
      description: cert.description,
      images: [cert.certificate],
    },
  };
}

export default async function CertificationDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const cert = getCertificationById(id);

  if (!cert) {
    notFound();
  }

  const { prevCert, nextCert } = getAdjacentCertifications(id);
  const dateRange = formatDateRange(cert.start_date, cert.end_date);

  return (
    <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
      {/* Dynamic Background Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse" />
        <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-12">
          <Link
            href="/certifications"
            className="group inline-flex items-center space-x-2 px-4 py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-purple-400" />
            <span>All Certifications</span>
          </Link>

          <div className="flex items-center space-x-2 text-xs md:text-sm text-white/50 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <Link href="/certifications" className="hover:text-white transition-colors">Certifications</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="text-white/90 font-medium truncate max-w-[150px] md:max-w-[250px]">
              {cert.institution}
            </span>
          </div>
        </div>

        {/* Content Header Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left Column: Details & Overview */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-950/50">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  <span>{cert.degree}</span>
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
                {cert.institution}
              </h1>

              {cert.field && (
                <div className="text-sm md:text-base text-blue-300 font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Field: {cert.field}</span>
                </div>
              )}

              <div className="relative h-1 w-20 md:w-28">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-xs" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <span>Program Overview</span>
              </h3>
              <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                {cert.description}
              </p>
            </div>

            {/* Action Buttons */}
            {cert.website && (
              <div className="pt-2">
                <a
                  href={cert.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-2 px-5 md:px-8 py-3 md:py-4 bg-linear-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 backdrop-blur-xl text-sm md:text-base font-semibold shadow-lg shadow-purple-500/10"
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform text-purple-400" />
                  <span>Visit Institution Website</span>
                </a>
              </div>
            )}

            {/* Learning Outcomes */}
            {cert.learning_outcomes && cert.learning_outcomes.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-lg md:text-xl font-bold text-white/90 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Key Learning Outcomes & Competencies</span>
                </h3>
                <ul className="space-y-2.5">
                  {cert.learning_outcomes.map((outcome, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0" />
                      <span className="text-sm md:text-base text-gray-300 leading-relaxed">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Certificate Image & Modal View */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Certificate Document</span>
              </h3>
              <p className="text-xs text-gray-400">
                Click image to view in high resolution fullscreen mode.
              </p>
              <Certificate
                certificate={cert.certificate}
                institution={cert.institution}
                id={cert.id}
              />
            </div>
          </div>
        </div>

        {/* Bottom Adjacent Navigation */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevCert ? (
            <Link
              href={`/certifications/${prevCert.id}`}
              className="group p-4 md:p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Previous Certification
              </span>
              <span className="text-base md:text-lg font-bold text-white group-hover:text-purple-200 mt-2 truncate">
                {prevCert.institution}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextCert && (
            <Link
              href={`/certifications/${nextCert.id}`}
              className="group p-4 md:p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between text-right items-end sm:col-start-2"
            >
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                Next Certification
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-base md:text-lg font-bold text-white group-hover:text-blue-200 mt-2 truncate">
                {nextCert.institution}
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
