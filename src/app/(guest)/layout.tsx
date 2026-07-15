import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-32 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
