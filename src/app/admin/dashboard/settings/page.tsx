// app/admin/dashboard/site-config/page.tsx
import { getSiteConfig } from "@/lib/site-config";
import SiteConfigForm from "@/components/admin/site/SiteConfig";
import Banner from "@/components/admin/Banner";
import Content from "@/components/admin/Content";

export default async function SiteConfigPage() {
  const config = await getSiteConfig();

  return (
    <Content>
      <Banner
        title="Site Configuration"
        description="Manage the content that appears across your live site — branding, hero copy, contact details, social links, and map location."
      />
      <SiteConfigForm initialConfig={config} />
    </Content>
  );
}
