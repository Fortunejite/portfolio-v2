import data from "@/data/data.json";
import { formatProjectDate, formatDateRange } from "@/lib/projects";

export interface Certification {
  id: number;
  institution: string;
  degree: string;
  field: string;
  website: string;
  certificate: string;
  start_date: string;
  end_date: string;
  description: string;
  learning_outcomes: string[];
}

export function getAllCertifications(): Certification[] {
  return (data.education || []) as Certification[];
}

export function getCertificationById(id: number | string): Certification | undefined {
  const certs = getAllCertifications();
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return certs.find((c) => c.id === numericId);
}

export function getAdjacentCertifications(currentId: number | string): {
  prevCert: Certification | null;
  nextCert: Certification | null;
} {
  const certs = getAllCertifications();
  const numericId = typeof currentId === "string" ? parseInt(currentId, 10) : currentId;
  const currentIndex = certs.findIndex((c) => c.id === numericId);

  if (currentIndex === -1) {
    return { prevCert: null, nextCert: null };
  }

  const prevCert = currentIndex > 0 ? certs[currentIndex - 1] : null;
  const nextCert = currentIndex < certs.length - 1 ? certs[currentIndex + 1] : null;

  return { prevCert, nextCert };
}

export { formatProjectDate, formatDateRange };
