import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllCertifications } from "@/lib/certifications";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fortunejite.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = getAllProjects();
  const certs = getAllCertifications();

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const certUrls = certs.map((cert) => ({
    url: `${baseUrl}/certifications/${cert.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...projectUrls,
    ...certUrls,
  ];
}
