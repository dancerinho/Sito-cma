import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteConfig.url}/`, lastModified, priority: 1 },
    { url: `${siteConfig.url}/privacy`, lastModified, priority: 0.3 },
    { url: `${siteConfig.url}/cookie-policy`, lastModified, priority: 0.3 },
  ];
}
