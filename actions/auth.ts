"use server";

import { createAuthActions } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function exchangeOAuthCode(code: string, codeVerifier: string) {
  const cookieStore = await cookies();
  const authActions = createAuthActions({ cookies: cookieStore });

  const { error } = await authActions.exchangeOAuthCode(code, codeVerifier);

  if (error) {
    return { error: error.message ?? "Authentication failed" };
  }

  return { error: null };
}

export async function signOut() {
  const cookieStore = await cookies();
  const authActions = createAuthActions({ cookies: cookieStore });

  const { error } = await authActions.signOut();
  if (error) {
    console.error("Sign out error:", error.message);
  }

  redirect("/login");
}
