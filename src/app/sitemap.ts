import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteConfig.url}/`, lastModified, priority: 1 },
    { url: `${siteConfig.url}/servizi`, lastModified, priority: 0.9 },
    { url: `${siteConfig.url}/studio`, lastModified, priority: 0.7 },
    { url: `${siteConfig.url}/metodo`, lastModified, priority: 0.7 },
    { url: `${siteConfig.url}/competenze`, lastModified, priority: 0.7 },
    { url: `${siteConfig.url}/progetti`, lastModified, priority: 0.7 },
    { url: `${siteConfig.url}/contatti`, lastModified, priority: 0.9 },
    { url: `${siteConfig.url}/privacy`, lastModified, priority: 0.3 },
    { url: `${siteConfig.url}/cookie-policy`, lastModified, priority: 0.3 },
  ];
}
