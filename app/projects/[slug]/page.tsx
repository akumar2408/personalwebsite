// app/projects/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import BackButton from "@/components/BackButton";

type Case = {
  title: string;
  problem: string[];
  built: string[];
  impact: string[];
  stack: string[];
  owned: string[];
  code?: string;
  demo?: string;
  appStore?: string;
  icon?: { src: string; alt: string };
  screenshots?: { src: string; alt: string }[];
  visuals?: { src: string; alt: string; caption: string }[];
};

const RICHISH_APP_STORE_URL =
  "https://apps.apple.com/us/app/richish-net-worth-tracker/id6760427550";

const cases: Record<string, Case> = {
  richish: {
    title: "Richish",
    problem: [
      "A lot of personal finance apps assume automated bank connections, even when users want privacy and manual control.",
      "The product needed to make wealth tracking feel clear, calm, and useful without making the user hand over financial accounts.",
    ],
    built: [
      "A SwiftUI iOS app for manual asset, liability, and net worth tracking.",
      "Clean mobile flows for updating financial data, reviewing changes, and understanding trends.",
      "Optional CSV import workflows, local-first thinking, StoreKit structure, and launch-prep polish.",
    ],
    impact: [
      "Shows an end-user product taken from idea through implementation and launch preparation.",
      "Combines product design, privacy-first thinking, mobile UX, and data presentation.",
    ],
    stack: ["SwiftUI", "StoreKit", "iOS", "Mobile UX", "Data presentation"],
    owned: ["product direction", "mobile UX", "app architecture", "data model", "launch prep"],
    appStore: RICHISH_APP_STORE_URL,
    icon: { src: "/richish/icon.png", alt: "Richish app icon" },
    screenshots: [
      { src: "/richish/home.png", alt: "Richish home dashboard screenshot" },
      { src: "/richish/transactions.png", alt: "Richish transactions analytics screenshot" },
      { src: "/richish/accounts.png", alt: "Richish accounts organization screenshot" },
      { src: "/richish/invest.png", alt: "Richish investments screenshot" },
    ],
  },

  "iam-dapp": {
    title: "IAM dApp",
    problem: [
      "Credential verification depends on trust, auditability, and clear roles between issuers, holders, and verifiers.",
      "The project needed a technical model for identity and credential workflows that could be inspected and verified.",
    ],
    built: [
      "Smart contract logic for credential registry concepts and verification flows.",
      "Full-stack workflow ideas for issuers, holders, and verifiers.",
      "A project structure around trust, auditable records, and decentralized identity patterns.",
    ],
    impact: [
      "Shows systems thinking beyond standard CRUD applications.",
      "Demonstrates comfort working with modern technical concepts, architecture, and verification workflows.",
    ],
    stack: ["Solidity", "Hardhat", "Smart contracts", "Blockchain application design"],
    owned: ["contract design", "identity workflow modeling", "verification logic", "project architecture"],
    visuals: [
      {
        src: "/iam-dapp/dashboard.png",
        alt: "IAM dApp DID dashboard interface",
        caption: "DID dashboard concept for registries, credentials, verification status, and audit flow.",
      },
      {
        src: "/iam-dapp/architecture.png",
        alt: "IAM dApp credential verification architecture diagram",
        caption: "Credential flow across issuers, holders, verifiers, registries, and immutable verification logs.",
      },
    ],
  },

  "personal-website": {
    title: "Personal Website",
    problem: [
      "The portfolio needed to communicate current technical direction instead of feeling like an outdated project list.",
      "Recruiters should quickly understand the through-line: software engineering, AI, data, and product-minded execution.",
    ],
    built: [
      "A custom Next.js site with TypeScript, Tailwind CSS, motion, project case studies, and a focused personal narrative.",
      "A content refresh that emphasizes current Insurity work, stronger projects, technical strengths, and product taste.",
    ],
    impact: [
      "Gives the site a clearer recruiting surface and a more current representation of the work.",
      "Shows frontend polish, interaction design, and personal brand judgment.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    owned: ["frontend architecture", "content strategy", "UI polish", "deployment"],
    visuals: [
      {
        src: "/site/personal-website-hero.png",
        alt: "Personal website hero section screenshot",
        caption: "Homepage hero for the portfolio refresh, combining motion, clearer positioning, and a stronger product presentation.",
      },
    ],
  },

  "ai-data-ml": {
    title: "AI / Data / ML Projects",
    problem: [
      "Many useful AI and analytics projects depend on structured data workflows before the model or dashboard can be trusted.",
      "The work needed to connect modeling, ETL-style thinking, analytics, and deployment exploration.",
    ],
    built: [
      "Model experiments, analytics dashboards, ETL-style data flows, and structured data problem solving.",
      "Exploration around AI-assisted tools, data pipelines, and ML deployment patterns on AWS.",
    ],
    impact: [
      "Shows the practical bridge between software engineering, data systems, and applied machine learning.",
      "Keeps the focus on useful systems rather than isolated theory.",
    ],
    stack: ["Python", "SQL", "AWS", "ETL", "Data pipelines", "Applied ML"],
    owned: ["model experimentation", "data workflow design", "analytics surfaces", "deployment exploration"],
    visuals: [
      {
        src: "/site/ai-investmate-dashboard.png",
        alt: "AI InvestMate financial dashboard with cashflow, markets, and AI briefing panels",
        caption: "AI InvestMate dashboard concept with cashflow snapshots, market pulse cards, planning views, and an AI briefing surface.",
      },
    ],
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = cases[params.slug];
  return { title: item ? `${item.title} · Case Study` : "Project" };
}

export default function ProjectCase({ params }: { params: { slug: string } }) {
  const item = cases[params.slug];
  if (!item) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="text-zinc-300">Not found.</p>
        <div className="mt-4 flex gap-4">
          <BackButton fallbackHref="/projects" label="Back to projects" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex items-center">
        <BackButton fallbackHref="/projects" label="Back to projects" />
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{item.title}</h1>

      {item.appStore && (
        <div className="mt-5 flex flex-wrap items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
          {item.icon && (
            <Image
              src={item.icon.src}
              alt={item.icon.alt}
              width={64}
              height={64}
              className="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/15"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-medium">Richish is live on the App Store</p>
            <p className="mt-1 text-sm text-zinc-400">
              Net worth, cash flow, accounts, and investments in one private iOS app.
            </p>
          </div>
          <a
            href={item.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
          >
            View on App Store
          </a>
        </div>
      )}

      {item.screenshots && (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {item.screenshots.map((shot) => (
            <div key={shot.src} className="overflow-hidden rounded-lg border border-white/10 bg-black/30">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1242}
                height={2688}
                sizes="(min-width: 768px) 180px, 45vw"
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      )}

      {item.visuals && (
        <div className="mt-8 grid gap-5">
          {item.visuals.map((visual) => (
            <figure key={visual.src} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
              <Image
                src={visual.src}
                alt={visual.alt}
                width={1672}
                height={941}
                sizes="(min-width: 768px) 768px, 94vw"
                className="h-auto w-full"
              />
              <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-zinc-400">
                {visual.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <Section title="Problem" points={item.problem} />
      <Section title="What I built" points={item.built} />
      <Section title="Impact" points={item.impact} />
      <Section title="Stack" points={item.stack} />
      <Section title="What I owned" points={item.owned} />

      {(item.code || item.demo) && (
        <div className="mt-6 flex gap-3">
          {item.code && (
            <a
              href={item.code}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
            >
              View code
            </a>
          )}
          {item.demo && (
            <a
              href={item.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
            >
              Open demo
            </a>
          )}
        </div>
      )}
    </main>
  );
}

function Section({ title, points }: { title: string; points: string[] }) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-medium">{title}</h2>
      <ul className="mt-2 list-disc ml-5 text-zinc-300 leading-relaxed space-y-2">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </section>
  );
}
