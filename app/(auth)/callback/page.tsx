"use client";

import { exchangeOAuthCode } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    async function handleCallback() {
      const code = searchParams.get("code") ?? searchParams.get("insforge_code");

      if (!code) {
        router.replace("/login");
        return;
      }

      const codeVerifier = sessionStorage.getItem("insforge_pkce_verifier") ?? "";
      sessionStorage.removeItem("insforge_pkce_verifier");

      try {
        const { error } = await exchangeOAuthCode(code, codeVerifier);

        if (error) {
          console.error("OAuth exchange failed:", error);
          router.replace("/login?error=auth_failed");
          return;
        }

        const next = sessionStorage.getItem("insforge_post_login_redirect") ?? "";
        sessionStorage.removeItem("insforge_post_login_redirect");
        // only follow relative paths to prevent open redirect
        const destination = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
        router.replace(destination);
      } catch (err) {
        console.error("OAuth callback threw:", err);
        router.replace("/login?error=auth_failed");
      }
    }

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-secondary text-sm">Signing you in…</p>
      </div>
    </div>
  );
}
