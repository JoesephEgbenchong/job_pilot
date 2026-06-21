import Image from "next/image";

type FeatureItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeaturePoint({ icon, title, description }: FeatureItem) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        <p className="mt-1 text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="bg-surface py-24 px-6">
      <div className="max-w-360 mx-auto grid grid-cols-2 gap-20 items-center">
        <div className="rounded-xl border border-border shadow-lg overflow-hidden">
          <Image
            src="/images/agnet-log.png"
            alt="Company research agent log"
            width={700}
            height={500}
            className="w-full h-auto"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-text-primary leading-tight">
            Apply With More
            <br />
            Confidence, Every Time
          </h2>
          <p className="mt-4 text-base text-text-secondary leading-relaxed">
            Understanding a company before you apply puts you ahead of 90% of
            applicants. JobPilot does that research for you.
          </p>
          <div className="mt-10 flex flex-col gap-8">
            <FeaturePoint
              icon={
                <svg
                  className="text-accent"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M10 3a7 7 0 1 1 0 14A7 7 0 0 1 10 3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10 7v3l2 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="AI Precision Job Matching"
              description="GPT-4o reads every job description and scores it 0–100 against your profile with a clear reason why."
            />
            <FeaturePoint
              icon={
                <svg
                  className="text-accent"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="10" cy="10" r="1" fill="currentColor" />
                </svg>
              }
              title="Focus on the right roles"
              description="High-match jobs are highlighted so they stand out. Low-match jobs are still there when you want them."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
