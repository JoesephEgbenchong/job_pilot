import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-surface py-20 px-6">
      <div className="max-w-360 mx-auto ">
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="absolute -inset-x-[48rem] -top-16 -bottom-8 pointer-events-none bg-[radial-gradient(ellipse_70%_90%_at_50%_40%,var(--color-accent-light)_0%,var(--color-info-lightest)_50%,transparent_75%)]" />
          <div className="relative">
            <h1 className="text-5xl font-bold text-text-primary leading-[1.15]">
              Job hunting is hard.
              <br />
              Your tools shouldn&apos;t be.
            </h1>
            <p className="mt-6 text-base text-text-secondary leading-relaxed">
              JobPilot finds relevant jobs, scores them against your profile,
              and researches companies — so you can focus on applying to the
              right ones.
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
                Find Your First Match
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-xl border border-border shadow-xl overflow-hidden">
          <div className="bg-surface-secondary flex items-center gap-1.5 px-4 py-3 border-b border-border">
            <div className="w-2.5 h-2.5 rounded-full bg-error" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning" />
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <div className="flex-1 mx-6 bg-background rounded px-3 py-1 text-center">
              <span className="text-xs text-text-muted">
                app.jobpilot.io/dashboard
              </span>
            </div>
          </div>
          <Image
            src="/images/dashboard-demo.png"
            alt="JobPilot Dashboard"
            width={1400}
            height={875}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
