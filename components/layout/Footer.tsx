import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-360 mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="JobPilot" width={500} height={170} className="h-7 w-auto" />
        </Link>
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} JobPilot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
