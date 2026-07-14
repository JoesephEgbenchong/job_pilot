import type { Profile } from "@/types";

export const MATCH_THRESHOLD = 70;

// Only these fields drive the completion score — email is auto-filled from
// auth (never missing), and linkedin/portfolio/work auth/remote preference
// are enhancer fields the design's attention banner doesn't flag.
const COMPLETION_FIELDS: {
  label: string;
  isFilled: (profile: Profile) => boolean;
}[] = [
  { label: "Full Name", isFilled: (p) => p.full_name.trim().length > 0 },
  { label: "Phone", isFilled: (p) => p.phone.trim().length > 0 },
  { label: "Location", isFilled: (p) => p.location.trim().length > 0 },
  { label: "Job Title", isFilled: (p) => p.current_title.trim().length > 0 },
  { label: "Experience Level", isFilled: (p) => p.experience_level.trim().length > 0 },
  { label: "Years of Experience", isFilled: (p) => p.years_experience > 0 },
  { label: "Skills", isFilled: (p) => p.skills.length > 0 },
  {
    label: "Work Experience",
    isFilled: (p) =>
      p.work_experience.some(
        (role) => role.company.trim() && role.title.trim() && role.start_date.trim(),
      ),
  },
  {
    label: "Education",
    isFilled: (p) =>
      p.education.institution.trim().length > 0 && p.education.graduation_year.trim().length > 0,
  },
  { label: "Job Titles Seeking", isFilled: (p) => p.job_titles_seeking.length > 0 },
];

export function calculateProfileCompletion(profile: Profile): {
  percentage: number;
  missingFields: string[];
} {
  const missing = COMPLETION_FIELDS.filter((field) => !field.isFilled(profile));
  const percentage = Math.round(
    ((COMPLETION_FIELDS.length - missing.length) / COMPLETION_FIELDS.length) * 100,
  );

  return { percentage, missingFields: missing.map((field) => field.label) };
}
