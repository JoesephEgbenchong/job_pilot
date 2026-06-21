import Image from "next/image";

export function Testimonial() {
  return (
    <section className="bg-background py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <blockquote className="text-2xl font-medium text-text-primary leading-relaxed italic">
          &ldquo;I used to spend my evenings copy-pasting resumes. Now I open
          my dashboard to see interviews waiting. It feels like cheating. Had 3
          offers on the table simultaneously.&rdquo;
        </blockquote>
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
            <Image
              src="/images/user-icon.png"
              alt="Joel Rivera"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              Joel Rivera
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              Senior Frontend Developer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
