import data from "@/data/data.json";

export interface Project {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  features: string[];
  github: string;
  website: string;
  type: string; // e.g. "freelance-project" | "side-project"
  start_date: string;
  end_date: string;
  technologies: string[];
  image: string;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Formats YYYY-MM into "MMM YYYY" (e.g. "2026-06" -> "Jun 2026")
 */
export function formatProjectDate(dateStr?: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length < 2) return dateStr;
  const year = parts[0];
  const monthIndex = parseInt(parts[1], 10) - 1;
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return dateStr;
  return `${MONTH_NAMES[monthIndex]} ${year}`;
}

/**
 * Formats start and end dates into a readable range (e.g. "Jun 2026 – Jul 2026")
 */
export function formatDateRange(startDate?: string, endDate?: string): string {
  const start = formatProjectDate(startDate);
  const end = formatProjectDate(endDate);
  if (start && end) {
    if (start === end) return start;
    return `${start} – ${end}`;
  }
  return start || end || "";
}

/**
 * Parses date string YYYY-MM into a numeric timestamp for comparisons
 */
function parseDateScore(dateStr?: string): number {
  if (!dateStr) return 0;
  const parts = dateStr.split("-");
  const year = parseInt(parts[0] || "0", 10);
  const month = parseInt(parts[1] || "1", 10);
  return year * 100 + month;
}

/**
 * Returns all projects sorted by:
 * 1. Freelance projects first (`type === 'freelance-project'`)
 * 2. Date descending (newest end_date / start_date first)
 */
export function getAllProjects(): Project[] {
  const projectsList = (data.projects || []) as Project[];

  return [...projectsList].sort((a, b) => {
    // 1. Freelance projects priority
    const aIsFreelance = a.type === "freelance-project";
    const bIsFreelance = b.type === "freelance-project";

    if (aIsFreelance && !bIsFreelance) return -1;
    if (!aIsFreelance && bIsFreelance) return 1;

    // 2. Sort by date descending (comparing end_date first, then start_date)
    const aEndDate = parseDateScore(a.end_date || a.start_date);
    const bEndDate = parseDateScore(b.end_date || b.start_date);

    if (bEndDate !== aEndDate) {
      return bEndDate - aEndDate;
    }

    const aStartDate = parseDateScore(a.start_date);
    const bStartDate = parseDateScore(b.start_date);

    return bStartDate - aStartDate;
  });
}

/**
 * Get project by ID
 */
export function getProjectById(id: string): Project | undefined {
  const all = getAllProjects();
  return all.find((p) => String(p.id) === String(id));
}

/**
 * Get adjacent projects for Next/Prev navigation
 */
export function getAdjacentProjects(currentId: string): {
  prevProject: Project | null;
  nextProject: Project | null;
} {
  const all = getAllProjects();
  const currentIndex = all.findIndex((p) => String(p.id) === String(currentId));

  if (currentIndex === -1) {
    return { prevProject: null, nextProject: null };
  }

  const prevProject = currentIndex > 0 ? all[currentIndex - 1] : null;
  const nextProject = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;

  return { prevProject, nextProject };
}
