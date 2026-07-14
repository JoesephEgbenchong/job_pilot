import { Navbar } from "@/components/layout/Navbar";
import { CompletionIndicator } from "@/components/profile/CompletionIndicator";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ResumeUpload } from "@/components/profile/ResumeUpload";
import { calculateProfileCompletion } from "@/lib/utils";
import type { Profile } from "@/types";

const mockProfile: Profile = {
  full_name: "Faizan Ali",
  email: "faizan@jsmastery.pro",
  phone: "",
  location: "",
  linkedin_url: "https://linkedin.com/in/faizan",
  portfolio_url: "https://github.com/jsmastery",
  work_authorization: "citizen",
  current_title: "Frontend Engineer",
  experience_level: "junior",
  years_experience: 4,
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  industries: [],
  work_experience: [
    {
      company: "Vercel",
      title: "Frontend Engineer",
      start_date: "2022-01",
      end_date: "",
      current: true,
      responsibilities: "Built Next.js features and optimized web vitals. Led a team of 3 developers.",
    },
  ],
  education: {
    degree: "high_school",
    field_of_study: "Computer Science",
    institution: "",
    graduation_year: "",
  },
  job_titles_seeking: ["Frontend Engineer", "React Developer"],
  remote_preference: "any",
  salary_expectation: "",
  preferred_locations: [],
  cover_letter_tone: "formal",
};

export default function ProfilePage() {
  const { percentage, missingFields } = calculateProfileCompletion(mockProfile);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-8 py-8 flex flex-col gap-6">
        <CompletionIndicator percentage={percentage} missingFields={missingFields} />
        <ResumeUpload />
        <ProfileForm initialProfile={mockProfile} />
      </main>
    </div>
  );
}
