// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import AiAssistant from "@/components/AiAssistant";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aayush-kumarr.vercel.app";
const TITLE = "Aayush Kumar | Software Engineer | AI, Data, Full-Stack";
const DESC =
  "Aayush Kumar is a software engineer in Phoenix focused on AI, data, and full-stack product development. He builds polished software systems with clean UX and practical technical depth.";

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
    "Data Engineer",
    "Next.js",
    "Machine Learning",
    "Arizona State University",
    "Phoenix Software Engineer",
  ],
  authors: [{ name: "Aayush Kumar", url: SITE_URL }],
  creator: "Aayush Kumar",
  publisher: "Aayush Kumar",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Aayush Kumar | Software Engineer",
    description: "Software engineer focused on AI, data, and full-stack product development.",
    siteName: "Aayush Kumar Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aayush Kumar Portfolio" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayush Kumar | Software Engineer",
    description: "AI, data, and full-stack product development.",
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
    // Add Google Search Console meta tag here if needed
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-fuchsia-500/40">
        <Header />
        {children}

        {/* Floating AI Assistant */}
        <AiAssistant />

        {/* JSON-LD Schema */}
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
                "https://www.linkedin.com/in/aayushkumar2/"
              ],
              image: `${SITE_URL}/aayush-headshot.png`,
              jobTitle: "Solution Analyst",
              worksFor: {
                "@type": "Organization",
                name: "Insurity"
              },
              affiliation: {
                "@type": "CollegeOrUniversity",
                name: "Arizona State University",
                sameAs: "https://www.asu.edu/"
              },
              description:
                "Software engineer focused on AI, data, and full-stack product development."
            })
          }}
        />

        {/* Confetti + Speech API Setup */}
        <Script id="voice-confetti">
          {`
            // Speech synthesis helper
            window.speak = (text) => {
              try {
                const msg = new SpeechSynthesisUtterance(text);
                msg.lang = "en-US";
                msg.rate = 1;
                msg.pitch = 1.05;
                msg.volume = 1;
                window.speechSynthesis.speak(msg);
              } catch (err) {
                console.warn("Speech failed:", err);
              }
            };

            // Confetti trigger
            window.sparkConfetti = () => {
              import("https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js")
                .then((mod) => {
                  const confetti = mod.default;
                  confetti({
                    particleCount: 80,
                    spread: 80,
                    origin: { y: 0.8 },
                    colors: ["#22d3ee", "#e879f9", "#ffffff"]
                  });
                })
                .catch(() => {});
            };
          `}
        </Script>
      </body>
    </html>
  );
}
