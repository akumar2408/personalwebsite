// app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aayush-kumarr.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`,           priority: 1.0,  changeFrequency: "weekly" },
    { url: `${SITE_URL}/projects`,   priority: 0.8,  changeFrequency: "monthly" },
    { url: `${SITE_URL}/contact`,    priority: 0.64, changeFrequency: "yearly" },
    // add more routes as you create them
  ];
}
