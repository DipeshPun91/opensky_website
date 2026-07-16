import { getSiteConfig } from "@/lib/site-config";
import SiteConfigForm from "@/components/admin/SiteConfigForm";

export default async function SiteConfigPage() {
  const config = await getSiteConfig();

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-500">
          Admin Panel
        </p>
        <h1 className="text-2xl font-black uppercase text-white sm:text-3xl">
          Site Configuration
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Manage the content that appears across your live site — branding, hero
          copy, contact details, social links, and map location.
        </p>
      </div>

      <SiteConfigForm initialConfig={config} />
    </div>
  );
}
