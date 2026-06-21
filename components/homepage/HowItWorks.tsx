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

export function HowItWorks() {
  return (
    <section className="bg-surface py-24 px-6">
      <div className="max-w-360 mx-auto grid grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-bold text-text-primary leading-tight">
            Manage Your Job
            <br />
            Search With Ease
          </h2>
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
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13 13L17 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              }
              title="Finds Jobs That Actually Fit"
              description="Our agent searches Adzuna and scores each role 0–100 against your real skills — not just keywords."
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
                  <path
                    d="M4 17V9l6-5 6 5v8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="7.5"
                    y="12"
                    width="5"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              }
              title="Know the Company Before You Apply"
              description="One click and the agent browses their website, extracts their tech stack and culture, and briefs you."
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
                  <rect
                    x="4"
                    y="3"
                    width="12"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 8h6M7 11h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              }
              title="Keep track of every application"
              description="Every matched job, company research, and application history — all in one clean dashboard."
            />
          </div>
        </div>

        <div className="rounded-xl border border-border shadow-lg overflow-hidden">
          <Image
            src="/images/jobs-lists.png"
            alt="Job listings interface"
            width={700}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
