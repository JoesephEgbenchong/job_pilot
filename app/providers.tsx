"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { insforge } from "@/lib/insforge-client";
import { initPostHog } from "@/lib/posthog-client";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (!pathname) return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    ph?.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, ph]);

  return null;
}

function PostHogIdentifier() {
  const ph = usePostHog();

  useEffect(() => {
    let mounted = true;

    async function syncIdentity() {
      const { data, error } = await insforge.auth.getCurrentUser();
      if (error) {
        console.error("[PostHogIdentifier] getCurrentUser failed:", error.message);
        return;
      }
      const user = data.user;

      if (!mounted) return;

      if (user) {
        ph?.identify(user.id, { email: user.email ?? undefined });
      } else {
        ph?.reset();
      }
    }

    syncIdentity();

    return () => {
      mounted = false;
    };
  }, [ph]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <PostHogIdentifier />
      {children}
    </PHProvider>
  );
}
