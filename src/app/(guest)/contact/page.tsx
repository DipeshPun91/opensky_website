import { getSiteConfig } from "@/lib/site-config";
import ContactContent from "@/components/guest/contact/ContactContent";

// Server component — reads directly from lib/site-config.ts instead of
// hardcoding phone/email/address/social links/map coordinates. Anything
// edited at /admin/dashboard/settings now actually shows up here. The
// interactive/animated part (Framer Motion, useBookingDialog) lives in
// ContactContent, a client component, since this file no longer needs
// to be one now that the data isn't hardcoded.
export default async function Contact() {
  const config = await getSiteConfig();
  return <ContactContent config={config} />;
}
