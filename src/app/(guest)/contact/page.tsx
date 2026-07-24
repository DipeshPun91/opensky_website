import { getSiteConfig } from "@/lib/site-config";
import ContactContent from "@/components/guest/contact/ContactContent";

export default async function Contact() {
  const config = await getSiteConfig();
  return <ContactContent config={config} />;
}
