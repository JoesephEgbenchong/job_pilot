import { SignOutButton } from "@/components/auth/SignOutButton";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
      <p className="text-text-secondary text-sm">Your job search overview will live here.</p>
      <SignOutButton />
    </div>
  );
}
