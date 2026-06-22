import { LoginCard } from "@/components/auth/LoginCard";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Suspense>
        <LoginCard />
      </Suspense>
    </div>
  );
}
