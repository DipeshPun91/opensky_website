import { getDb } from "./db/mongodb";

export interface SiteConfig {
  // Branding
  siteName: string;
  tagline: string;
  // Hero section (Banner.tsx)
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  // Contact info (Contact.tsx)
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  // Social links
  socialFacebook: string;
  socialInstagram: string;
  // Map location (LocationMap.tsx)
  mapLat: number;
  mapLng: number;
}

interface SiteConfigDocument extends SiteConfig {
  _id: string;
}

const CONFIG_DOC_ID = "site-config";

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: "OpenSky",
  tagline: "Paragliding Adventures",
  heroEyebrow: "Ready For Adventure?",
  heroTitleLine1: "Soar Above",
  heroTitleLine2: "The Himalayas",
  heroDescription:
    "Experience the ultimate freedom of tandem paragliding over Pokhara Valley, Phewa Lake, and the majestic Annapurna range with our certified expert pilots.",
  contactPhone: "+977 9846212425",
  contactEmail: "openskyparagliding@gmail.com",
  contactAddress: "Pokhara-6, Hallan Chowk, Kaski, 33700, Nepal",
  socialFacebook: "https://www.facebook.com/openskyparagliding",
  socialInstagram: "https://www.instagram.com/openskyparagliding/",
  mapLat: 28.215617709578726,
  mapLng: 83.9562502148494,
};

const EDITABLE_FIELDS = Object.keys(
  DEFAULT_SITE_CONFIG,
) as (keyof SiteConfig)[];

export async function getSiteConfig(): Promise<SiteConfig> {
  const db = await getDb();
  const doc = await db
    .collection<SiteConfigDocument>("siteConfig")
    .findOne({ _id: CONFIG_DOC_ID });

  if (!doc) return DEFAULT_SITE_CONFIG;

  const { _id, ...config } = doc;
  void _id;

  return { ...DEFAULT_SITE_CONFIG, ...config };
}

export async function updateSiteConfig(
  updates: Partial<SiteConfig>,
): Promise<SiteConfig> {
  const sanitized: Partial<SiteConfig> = {};

  for (const key of EDITABLE_FIELDS) {
    if (updates[key] === undefined) continue;

    if (key === "mapLat" || key === "mapLng") {
      const num = Number(updates[key]);
      if (!Number.isNaN(num)) sanitized[key] = num;
    } else {
      const value = updates[key];
      if (typeof value === "string") sanitized[key] = value.trim();
    }
  }

  const db = await getDb();
  await db
    .collection<SiteConfigDocument>("siteConfig")
    .updateOne({ _id: CONFIG_DOC_ID }, { $set: sanitized }, { upsert: true });

  return getSiteConfig();
}
