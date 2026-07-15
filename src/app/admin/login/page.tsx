import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

// Part of "hidden": tells search engines not to index or crawl this page.
export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <LoginForm />
    </main>
  );
}
