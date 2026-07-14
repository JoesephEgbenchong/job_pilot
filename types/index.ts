export type WorkAuthorization = "citizen" | "permanent_resident" | "visa_required";
export type ExperienceLevel = "junior" | "mid" | "senior" | "lead";
export type RemotePreference = "remote" | "onsite" | "hybrid" | "any";
export type CoverLetterTone = "formal" | "casual" | "enthusiastic";

export type WorkExperienceEntry = {
  company: string;
  title: string;
  start_date: string;
  end_date: string;
  current: boolean;
  responsibilities: string;
};

export type Education = {
  degree: string;
  field_of_study: string;
  institution: string;
  graduation_year: string;
};

export type Profile = {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  portfolio_url: string;
  work_authorization: WorkAuthorization;
  current_title: string;
  experience_level: ExperienceLevel;
  years_experience: number;
  skills: string[];
  industries: string[];
  work_experience: WorkExperienceEntry[];
  education: Education;
  job_titles_seeking: string[];
  remote_preference: RemotePreference;
  salary_expectation: string;
  preferred_locations: string[];
  cover_letter_tone: CoverLetterTone;
};
