// app/projects/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

type Case = {
  title: string;
  problem: string[];
  built: string[];
  impact: string[];
  stack: string[];
  owned: string[];
  code?: string;
  demo?: string;
};

const cases: Record<string, Case> = {
  "operational-dashboard": {
    title: "Operational Dashboard",
    problem: [
      "Leads and deals lived in different places and people made decisions from stale spreadsheets.",
      "The team needed a simple view of the numbers and a light forecast that didn’t get in the way.",
    ],
    built: [
      "A small React + API setup that pulled data on a schedule and cached results for quick loads.",
      "Clear charts for pipeline, conversion, and a basic 30-day projection.",
      "Role-based access with seed data so anyone could try it locally.",
    ],
    impact: [
      "Gave the team one reliable place to check the week and plan the next one.",
      "Reduced manual spreadsheet updates and made weekly reviews faster.",
    ],
    stack: ["React", "Spring Boot", "PostgreSQL", "Docker", "GitHub Actions"],
    owned: ["frontend UI", "API endpoints", "DB schema", "deploy", "basic tests"],
    code: "https://github.com/akumar2408/operationaldashboard/",
    demo: "",
  },

  aiinvestmate: {
    title: "AIInvestMate",
    problem: [
      "Students wanted a safe way to try simple investing ideas without real money or complex tools.",
    ],
    built: [
      "Next.js app with auth, saved portfolios, and quick scenario runs.",
      "Clean forms and guardrails so numbers stay sensible.",
      "Basic content to explain what the model does and doesn’t do.",
    ],
    impact: [
      "Lowered the barrier to experiment and learn.",
      "Made conversations about risk and return more concrete.",
    ],
    stack: ["Next.js", "Supabase", "TypeScript"],
    owned: ["app architecture", "auth + data model", "UI/UX", "deployment"],
    code: "https://github.com/akumar2408/AIInvestMate",
    demo: "https://aiinvestmate.vercel.app",
  },

  "stock-based-comp": {
    title: "Stock-Based Compensation System",
    problem: [
      "Finance needed a simple way to calculate stock-based comp with clean exports.",
    ],
    built: [
      "Small service with clear inputs/outputs and predictable jobs.",
      "Basic tests and a seed script for reliable demos.",
    ],
    impact: [
      "Cut manual time and reduced spreadsheet errors.",
      "Kept deploys smooth during busy weeks.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "GitHub Actions"],
    owned: ["API design", "data model", "tests", "deployment"],
    code: "https://github.com/akumar2408/stock-based-comp",
  },

  "streaming-etl": {
    title: "Safety Guardian – Streaming ETL",
    problem: [
      "Sensor data arrived in bursts and dashboards lagged.",
      "Ops needed a pipeline that was simple, visible, and easy to fix.",
    ],
    built: [
      "A tiny streaming path with clear transforms and a backfill toggle.",
      "Dead-letter queue and metrics so issues were obvious.",
    ],
    impact: [
      "Fresher data within minutes instead of hours.",
      "On-call triaged faster because logs and metrics were straightforward.",
    ],
    stack: ["AWS Kinesis", "Glue", "Redshift", "Python"],
    owned: ["ETL steps", "infra as code", "alerts", "dashboards"],
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
          <Link href="/projects" className="underline text-sm opacity-80">
            ← Back to projects
          </Link>
          <Link href="/" className="underline text-sm opacity-80">
            ← Back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <Link href="/projects" className="text-sm opacity-80 hover:underline">
          ← Back to projects
        </Link>
        <Link href="/" className="text-sm opacity-80 hover:underline">
          ← Back home
        </Link>
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{item.title}</h1>

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
              className="rounded-[12px] border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
            >
              View code
            </a>
          )}
          {item.demo && (
            <a
              href={item.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[12px] border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
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
