// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aayush-kumarr.vercel.app";
const TITLE = "Aayush Kumar | AI & Software Engineer | ASU";
const DESC =
  "Aayush Kumar — Senior at Arizona State University (ASU), finishing CS in Dec and pursuing an accelerated MS in Big Data Systems (3.5+1). I build AI-powered, data-driven apps with clean UX.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Aayush Kumar" },
  description: DESC,
  keywords: [
    "Aayush Kumar",
    "Aayush Kumar ASU",
    "Software Engineer",
    "AI Engineer",
    "Big Data Systems",
    "Next.js",
    "Machine Learning",
    "Arizona State University",
  ],
  authors: [{ name: "Aayush Kumar", url: SITE_URL }],
  creator: "Aayush Kumar",
  publisher: "Aayush Kumar",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Aayush Kumar | AI & Software Engineer",
    description: "Senior @ ASU | Building intelligent systems with AI, data, and code.",
    siteName: "Aayush Kumar Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aayush Kumar Portfolio" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayush Kumar | Software & AI Engineer",
    description: "ASU CS + Accelerated MS (Big Data Systems). I build AI/data products.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // After adding your site to Google Search Console, paste the meta content here:
    // google: "PASTE_GOOGLE_SEARCH_CONSOLE_CODE"
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <Header />
        {children}

        {/* JSON-LD Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aayush Kumar",
              email: "mailto:aayushkumar2004@gmail.com",
              url: SITE_URL,
              sameAs: [
                "https://github.com/akumar2408",
                "https://www.linkedin.com/in/aayushkumar2/",
              ],
              jobTitle: "Software Engineer",
              affiliation: {
                "@type": "CollegeOrUniversity",
                name: "Arizona State University",
                sameAs: "https://www.asu.edu/",
              },
              description:
                "AI + Software Engineer from ASU building intelligent, data-driven systems.",
            }),
          }}
        />
      </body>
    </html>
  );
}
