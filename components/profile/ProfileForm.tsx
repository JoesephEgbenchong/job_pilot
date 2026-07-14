"use client";

import { useState } from "react";

import type {
  Education,
  ExperienceLevel,
  Profile,
  RemotePreference,
  WorkAuthorization,
  WorkExperienceEntry,
} from "@/types";

type Props = {
  initialProfile: Profile;
};

const inputClass =
  "w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent";
const disabledInputClass = "bg-surface-secondary text-text-muted cursor-not-allowed";
const labelClass = "block text-xs font-medium text-text-secondary uppercase tracking-wide mb-1.5";
const inlineLabelClass = "text-xs font-medium text-text-secondary uppercase tracking-wide";
const sectionHeadingClass = "text-sm font-semibold text-text-primary";

const WORK_AUTH_OPTIONS: { value: WorkAuthorization; label: string }[] = [
  { value: "citizen", label: "Citizen" },
  { value: "permanent_resident", label: "Permanent Resident" },
  { value: "visa_required", label: "Visa Required" },
];

const EXPERIENCE_LEVEL_OPTIONS: { value: ExperienceLevel; label: string }[] = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
];

const REMOTE_PREFERENCE_OPTIONS: { value: RemotePreference; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "Onsite" },
  { value: "hybrid", label: "Hybrid" },
  { value: "any", label: "Any" },
];

const DEGREE_OPTIONS = [
  { value: "high_school", label: "High School" },
  { value: "associate", label: "Associate's" },
  { value: "bachelor", label: "Bachelor's" },
  { value: "master", label: "Master's" },
  { value: "phd", label: "PhD" },
];

const MAX_WORK_EXPERIENCE_ROLES = 3;

export function ProfileForm({ initialProfile }: Props) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [newSkill, setNewSkill] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [jobTitlesSeekingText, setJobTitlesSeekingText] = useState(
    initialProfile.job_titles_seeking.join(", "),
  );
  const [preferredLocationsText, setPreferredLocationsText] = useState(
    initialProfile.preferred_locations.join(", "),
  );

  function updateField<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function updateEducation<K extends keyof Education>(key: K, value: Education[K]) {
    setProfile((prev) => ({ ...prev, education: { ...prev.education, [key]: value } }));
  }

  function updateRole<K extends keyof WorkExperienceEntry>(
    index: number,
    key: K,
    value: WorkExperienceEntry[K],
  ) {
    setProfile((prev) => ({
      ...prev,
      work_experience: prev.work_experience.map((role, i) =>
        i === index ? { ...role, [key]: value } : role,
      ),
    }));
  }

  function addRole() {
    if (profile.work_experience.length >= MAX_WORK_EXPERIENCE_ROLES) return;
    setProfile((prev) => ({
      ...prev,
      work_experience: [
        ...prev.work_experience,
        { company: "", title: "", start_date: "", end_date: "", current: false, responsibilities: "" },
      ],
    }));
  }

  function removeRole(index: number) {
    setProfile((prev) => ({
      ...prev,
      work_experience: prev.work_experience.filter((_, i) => i !== index),
    }));
  }

  function addSkill() {
    const skill = newSkill.trim();
    if (!skill || profile.skills.includes(skill)) return;
    updateField("skills", [...profile.skills, skill]);
    setNewSkill("");
  }

  function removeSkill(skill: string) {
    updateField(
      "skills",
      profile.skills.filter((s) => s !== skill),
    );
  }

  function addIndustry() {
    const industry = newIndustry.trim();
    if (!industry || profile.industries.includes(industry)) return;
    updateField("industries", [...profile.industries, industry]);
    setNewIndustry("");
  }

  function removeIndustry(industry: string) {
    updateField(
      "industries",
      profile.industries.filter((i) => i !== industry),
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl shadow p-6">
      <h2 className="text-base font-semibold text-text-primary">Profile Information</h2>
      <p className="text-sm text-text-secondary mt-1">
        This context is used to accurately represent you in agent interactions.
      </p>

      <hr className="border-border my-6" />

      <section>
        <h3 className={sectionHeadingClass}>Personal Info</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <TextField
            label="Full Name"
            value={profile.full_name}
            onChange={(v) => updateField("full_name", v)}
          />
          <TextField label="Email" value={profile.email} disabled />
          <TextField
            label="Phone Number"
            value={profile.phone}
            placeholder="+1 (555) 000-0000"
            onChange={(v) => updateField("phone", v)}
          />
          <TextField
            label="Location"
            value={profile.location}
            placeholder="City, Country"
            onChange={(v) => updateField("location", v)}
          />
          <TextField
            label="LinkedIn URL"
            value={profile.linkedin_url}
            onChange={(v) => updateField("linkedin_url", v)}
          />
          <TextField
            label="Portfolio / GitHub"
            value={profile.portfolio_url}
            onChange={(v) => updateField("portfolio_url", v)}
          />
          <SelectField
            label="Work Authorization"
            value={profile.work_authorization}
            onChange={(v) => updateField("work_authorization", v as WorkAuthorization)}
            options={WORK_AUTH_OPTIONS}
          />
        </div>
      </section>

      <hr className="border-border my-6" />

      <section>
        <h3 className={sectionHeadingClass}>Professional Info</h3>
        <div className="mt-4">
          <TextField
            label="Current/Recent Job Title"
            value={profile.current_title}
            onChange={(v) => updateField("current_title", v)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <SelectField
            label="Experience Level"
            value={profile.experience_level}
            onChange={(v) => updateField("experience_level", v as ExperienceLevel)}
            options={EXPERIENCE_LEVEL_OPTIONS}
          />
          <TextField
            label="Years of Experience"
            type="number"
            value={String(profile.years_experience)}
            onChange={(v) => updateField("years_experience", Number(v) || 0)}
          />
        </div>

        <div className="mt-4">
          <label className={labelClass}>Skills</label>
          <div className="flex gap-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add a skill"
              className={inputClass}
            />
            <button
              type="button"
              onClick={addSkill}
              className="shrink-0 bg-surface border border-border text-text-primary text-sm font-medium px-4 py-2 rounded-md hover:bg-surface-secondary transition-colors"
            >
              Add
            </button>
          </div>
          {profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.skills.map((skill) => (
                <Tag key={skill} label={skill} onRemove={() => removeSkill(skill)} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className={labelClass}>Industries Worked In (Optional)</label>
          <div className="flex gap-2">
            <input
              value={newIndustry}
              onChange={(e) => setNewIndustry(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addIndustry();
                }
              }}
              placeholder="E.g. FinTech, Healthcare"
              className={inputClass}
            />
            <button
              type="button"
              onClick={addIndustry}
              className="shrink-0 bg-surface border border-border text-text-primary text-sm font-medium px-4 py-2 rounded-md hover:bg-surface-secondary transition-colors"
            >
              Add
            </button>
          </div>
          {profile.industries.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.industries.map((industry) => (
                <Tag key={industry} label={industry} onRemove={() => removeIndustry(industry)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <hr className="border-border my-6" />

      <section>
        <div className="flex items-center justify-between">
          <h3 className={sectionHeadingClass}>Work Experience</h3>
          {profile.work_experience.length < MAX_WORK_EXPERIENCE_ROLES && (
            <button
              type="button"
              onClick={addRole}
              className="flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
            >
              <PlusIcon />
              Add role
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {profile.work_experience.map((role, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              {index > 0 && (
                <div className="flex justify-end mb-2">
                  <button
                    type="button"
                    onClick={() => removeRole(index)}
                    className="text-xs font-medium text-error hover:underline"
                  >
                    Remove role
                  </button>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Company Name"
                  value={role.company}
                  onChange={(v) => updateRole(index, "company", v)}
                />
                <TextField
                  label="Job Title"
                  value={role.title}
                  onChange={(v) => updateRole(index, "title", v)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <TextField
                  label="Start Date"
                  type="month"
                  value={role.start_date}
                  onChange={(v) => updateRole(index, "start_date", v)}
                />
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={inlineLabelClass}>End Date</span>
                    <label className="flex items-center gap-1.5 text-xs text-text-secondary">
                      <input
                        type="checkbox"
                        checked={role.current}
                        onChange={(e) => {
                          updateRole(index, "current", e.target.checked);
                          if (e.target.checked) updateRole(index, "end_date", "");
                        }}
                        className="accent-accent"
                      />
                      Currently working here
                    </label>
                  </div>
                  <input
                    type="month"
                    value={role.end_date}
                    disabled={role.current}
                    onChange={(e) => updateRole(index, "end_date", e.target.value)}
                    className={`${inputClass} ${role.current ? disabledInputClass : ""}`}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className={labelClass}>Key Responsibilities</label>
                <textarea
                  value={role.responsibilities}
                  onChange={(e) => updateRole(index, "responsibilities", e.target.value)}
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border my-6" />

      <section>
        <h3 className={sectionHeadingClass}>Education</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <SelectField
            label="Highest Degree"
            value={profile.education.degree}
            onChange={(v) => updateEducation("degree", v)}
            options={DEGREE_OPTIONS}
          />
          <TextField
            label="Field of Study"
            value={profile.education.field_of_study}
            onChange={(v) => updateEducation("field_of_study", v)}
          />
          <TextField
            label="Institution Name"
            value={profile.education.institution}
            placeholder="E.g. State University"
            onChange={(v) => updateEducation("institution", v)}
          />
          <TextField
            label="Graduation Year"
            value={profile.education.graduation_year}
            placeholder="YYYY"
            onChange={(v) => updateEducation("graduation_year", v)}
          />
        </div>
      </section>

      <hr className="border-border my-6" />

      <section>
        <h3 className={sectionHeadingClass}>Job Preferences</h3>
        <div className="mt-4">
          <TextField
            label="Job Titles Seeking"
            value={jobTitlesSeekingText}
            onChange={(v) => {
              setJobTitlesSeekingText(v);
              updateField(
                "job_titles_seeking",
                v.split(",").map((t) => t.trim()).filter(Boolean),
              );
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <SelectField
            label="Remote Preference"
            value={profile.remote_preference}
            onChange={(v) => updateField("remote_preference", v as RemotePreference)}
            options={REMOTE_PREFERENCE_OPTIONS}
          />
          <TextField
            label="Salary Expectation (Optional)"
            value={profile.salary_expectation}
            placeholder="E.g. $120k+"
            onChange={(v) => updateField("salary_expectation", v)}
          />
        </div>
        <div className="mt-4">
          <TextField
            label="Preferred Locations (Optional)"
            value={preferredLocationsText}
            placeholder="E.g. New York, London"
            onChange={(v) => {
              setPreferredLocationsText(v);
              updateField(
                "preferred_locations",
                v.split(",").map((t) => t.trim()).filter(Boolean),
              );
            }}
          />
        </div>
      </section>

      <button
        type="button"
        className="w-full mt-8 bg-accent text-accent-foreground text-sm font-semibold py-3 rounded-md hover:bg-accent-dark transition-colors"
      >
        Save Profile
      </button>
    </div>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
};

function TextField({ label, value, onChange, placeholder, disabled, type = "text" }: TextFieldProps) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${inputClass} ${disabled ? disabledInputClass : ""}`}
      />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} appearance-none pr-8`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronIcon />
      </div>
    </div>
  );
}

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 bg-surface-secondary border border-border text-sm text-text-primary px-3 py-1 rounded-full">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="text-text-muted hover:text-text-primary"
      >
        <XIcon />
      </button>
    </span>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
