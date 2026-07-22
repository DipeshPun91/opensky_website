// app/admin/login/page.tsx
import type { Metadata } from "next";
import LoginForm from "@/components/admin/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <LoginForm />
    </main>
  );
}
