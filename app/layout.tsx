import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aayush Kumar — Personal Site",
  description: "Builder of practical AI systems and clean, end‑to‑end software.",
  metadataBase: new URL("https://aayush.yourdomain.com"),
  openGraph: {
    title: "Aayush Kumar — Personal Site",
    description: "Builder of practical AI systems and clean, end‑to‑end software.",
    url: "https://aayush.yourdomain.com",
    siteName: "Aayush Kumar",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Aayush Kumar — Personal Site", description: "Builder of practical AI systems and clean, end‑to‑end software.", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
