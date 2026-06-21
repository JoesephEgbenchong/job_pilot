import Link from "next/link";

export function BottomCTA() {
  return (
    <section className="py-24 px-6 bg-linear-to-r from-accent-muted via-info-lightest to-accent-light">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-text-primary leading-tight">
          Your next job search can feel
          <br />a lot less overwhelming
        </h2>
        <p className="mt-6 text-base text-text-secondary">
          Set up your profile, upload your resume, and let JobPilot handle the
          rest.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="bg-accent text-accent-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-accent-dark transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="bg-surface border border-border text-text-primary px-5 py-2.5 rounded-md text-sm font-medium hover:bg-surface-secondary transition-colors"
          >
            See How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
