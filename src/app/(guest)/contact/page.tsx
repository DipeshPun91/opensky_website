// app/contact/page.tsx
import { getSiteConfig } from "@/lib/site-config";
import ContactContent from "@/components/guest/contact/ContactContent";
import type { SiteConfig } from "@/lib/site-config";

export default async function Contact() {
  let config: SiteConfig;

  try {
    config = await getSiteConfig();
  } catch (error) {
    console.error("Failed to load site configuration", error);
    // Use default config if database fails
    const { DEFAULT_SITE_CONFIG } = await import("@/lib/site-config");
    config = DEFAULT_SITE_CONFIG;
  }

  return <ContactContent config={config} />;
}
