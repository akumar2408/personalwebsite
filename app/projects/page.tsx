// app/projects/page.tsx
import Link from "next/link";
import BackButton from "@/components/BackButton";

const items = [
  {
    slug: "richish",
    title: "Richish",
    summary:
      "Live iOS wealth tracking app built around manual tracking, clean UX, local-first thinking, and optional CSV import workflows.",
  },
  {
    slug: "iam-dapp",
    title: "IAM dApp",
    summary:
      "Decentralized identity and credential verification project with smart contracts, issuers, holders, verifiers, and auditable workflows.",
  },
  {
    slug: "personal-website",
    title: "Personal Website",
    summary:
      "Custom portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion to present work with a premium product feel.",
  },
  {
    slug: "ai-data-ml",
    title: "AI / Data / ML Projects",
    summary:
      "Applied model, analytics, ETL-style, and structured data projects showing the bridge between software, AI, and data systems.",
  },
];

export default function ProjectsIndex() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <BackButton fallbackHref="/#projects" label="Back" />
      </div>
      <p className="opacity-70 mt-1">Selected builds across product, AI, data, and full-stack systems.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition block"
          >
            <h2 className="font-medium">{p.title}</h2>
            <p className="text-sm text-zinc-300 mt-1">{p.summary}</p>
            <span className="text-sm underline mt-2 inline-block">
              Read the case study
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
