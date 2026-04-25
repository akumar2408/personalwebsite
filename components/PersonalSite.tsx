"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import {
  Github, Linkedin, Mail, FileText, ArrowRight, MapPin, Rocket, ExternalLink,
  Download, GraduationCap, Award, Code, Server, Database, Boxes,
  TerminalSquare, HelpCircle, Keyboard, Grid3X3, BriefcaseBusiness, Cpu, GraduationCap as GraduationIcon
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import QuoteCard from "@/components/QuoteRotator";
import Changelog from "@/components/Changelog";
import CodingAnimation from "@/components/CodingAnimation";


/* =========================
   Basic config
========================= */
const CONFIG = {
  name: "Aayush Kumar",
  tagline: "I like making useful stuff that just works.",
  location: "Phoenix, Arizona",
  email: "aayushkumar2004@gmail.com",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/akumar2408",
  linkedin: "https://www.linkedin.com/in/aayushkumar2/",
};

const nav = [
  { id: "about", label: "About", hint: "Who I am + what I do" },
  { id: "skills", label: "Skills", hint: "Stacks I use a lot" },
  { id: "projects", label: "Projects", hint: "Selected builds & case studies" },
  { id: "now", label: "Now", hint: "What I’m focused on this month" }, // NEW
  { id: "experience", label: "Experience", hint: "Work + education" },
  { id: "contact", label: "Contact", hint: "Say hi" },
];

/* =========================
   Content
========================= */
const skills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "HTML", "CSS"],
  "Frontend & Mobile": ["React", "Next.js", "Tailwind CSS", "Swift", "SwiftUI", "Angular"],
  "Backend & APIs": [".NET", "REST APIs", "Supabase", "Full-stack development"],
  "Data & AI": ["Data pipelines", "Applied machine learning", "Airflow", "ETL workflows"],
  Cloud: ["AWS", "Cloud-backed apps", "Automation"],
  Tools: ["Git", "GitHub", "Azure DevOps"],
};

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code,
  "Frontend & Mobile": Boxes,
  "Backend & APIs": Server,
  "Data & AI": Database,
  Cloud: Server,
  Tools: TerminalSquare,
};

type Project = {
  slug: string;
  title: string;
  blurb: string;
  links: { label: string; href: string }[];
  tags: string[];
  image?: { src: string; alt: string };
  icon?: { src: string; alt: string };
};

const RICHISH_APP_STORE_URL =
  "https://apps.apple.com/us/app/richish-net-worth-tracker/id6760427550";

const projects: Project[] = [
  {
    slug: "richish",
    title: "Richish",
    blurb: "Private iOS wealth tracking app with manual finance workflows, clean UX, and local-first thinking.",
    links: [{ label: "App Store", href: RICHISH_APP_STORE_URL }],
    tags: ["SwiftUI", "StoreKit", "Mobile UX", "Privacy-first"],
    icon: { src: "/richish/icon.png", alt: "Richish app icon" },
  },
  {
    slug: "iam-dapp",
    title: "IAM dApp",
    blurb: "Decentralized identity and credential verification system built around trust and auditable workflows.",
    links: [],
    tags: ["Solidity", "Hardhat", "Smart Contracts", "Verification"],
    image: { src: "/iam-dapp/dashboard.png", alt: "IAM dApp DID dashboard preview" },
  },
  {
    slug: "personal-website",
    title: "Personal Website",
    blurb: "Custom portfolio built to present experience, projects, and direction with a polished product feel.",
    links: [],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: { src: "/site/personal-website-hero.png", alt: "Personal website landing page screenshot" },
  },
  {
    slug: "ai-data-ml",
    title: "AI / Data / ML Projects",
    blurb: "Modeling, analytics, ETL-style workflows, and applied AI experiments across structured data problems.",
    links: [],
    tags: ["Python", "Data Pipelines", "ML", "AWS"],
    image: { src: "/site/ai-investmate-dashboard.png", alt: "AI InvestMate financial dashboard preview" },
  },
];

/* =========================
   Motion helpers
========================= */
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* =========================
   Splash intro
========================= */
function Chip({
  icon: Icon,
  children,
  tone = "cyan",
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  tone?: "cyan" | "fuchsia" | "purple";
}) {
  const color =
    tone === "cyan"
      ? "text-cyan-300"
      : tone === "fuchsia"
      ? "text-fuchsia-300"
      : "text-purple-300";

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-2 pr-3 py-1.5">
      <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-white/5 ring-1 ring-white/10">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
      </span>
      <span className="text-sm">{children}</span>
    </span>
  );
}

function SplashOverlay() {
  const [show, setShow] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduced(!!mq?.matches);
  }, []);

  useEffect(() => {
    if (!show) return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    return () => {
      el.style.overflow = prev;
    };
  }, [show]);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), reduced ? 800 : 3400);
    return () => clearTimeout(t);
  }, [reduced]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] pointer-events-none select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_20%,rgba(34,211,238,0.12),transparent_70%),radial-gradient(60%_60%_at_70%_80%,rgba(168,85,247,0.12),transparent_70%)]" />
          <div className="relative h-full grid place-items-center">
            <div className="translate-y-16">
              <svg
                viewBox="0 0 960 260"
                className="block mx-auto"
                style={{ width: "min(92vw, 960px)", height: "auto" }}
              >
                <defs>
                  <linearGradient id="splashInk" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#d946ef" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <motion.text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  fontWeight={900}
                  fontSize={76}
                  fill="transparent"
                  stroke="url(#splashInk)"
                  strokeWidth="4"
                  style={{ strokeDasharray: 1400, strokeDashoffset: 1400 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: reduced ? 0.25 : 1.2, ease: "easeInOut" }}
                >
                  Aayush Kumar
                </motion.text>
                <motion.text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  fontWeight={900}
                  fontSize={76}
                  fill="url(#splashInk)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reduced ? 0 : 0.45, duration: reduced ? 0.1 : 0.35 }}
                >
                  Aayush Kumar
                </motion.text>
                <motion.rect
                  x={220}
                  y={170}
                  width={520}
                  height={5}
                  rx={2}
                  fill="url(#splashInk)"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ transformOrigin: "50% 50%" }}
                  transition={{ delay: reduced ? 0.1 : 0.95, duration: reduced ? 0.1 : 0.45, ease: "easeOut" }}
                />
              </svg>
                <motion.div
                className="mt-6 text-center text-zinc-100 text-lg md:text-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0.15 : 1.15, duration: reduced ? 0.15 : 0.45 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-purple-300">
                  Software Engineer | AI, Data & Full-Stack
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================
   Grid overlay (⌘K → toggle)
========================= */
function GridOverlay({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[50] mix-blend-screen opacity-40">
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.15)_95%),repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_80px)]" />
    </div>
  );
}

/* =========================
   Quick Tour (press ?)
========================= */
function QuickTour({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  if (!open) return null;
  const Item = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-2 text-sm text-zinc-200">
      <Keyboard className="h-4 w-4 mt-0.5" />
      {children}
    </li>
  );
  return (
    <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div
        className="mx-auto mt-24 max-w-xl rounded-lg border border-white/10 bg-zinc-900 text-zinc-100 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-lg font-semibold mb-2">
          <HelpCircle className="h-5 w-5" /> Quick Tour
        </div>
        <ul className="grid gap-2">
          <Item>
            Press <code className="px-1 rounded bg-white/10">⌘/Ctrl + K</code> to open the command palette.
          </Item>
          <Item>
            Press <code className="px-1 rounded bg-white/10">?</code> to toggle this tour.
          </Item>
          <Item>
            Press <code className="px-1 rounded bg-white/10">~</code> to open the Easter-egg terminal.
          </Item>
          <Item>Use palette actions to copy email, print resume, or jump to a random project.</Item>
          <Item>Toggle the design grid from the palette when showcasing layout work.</Item>
        </ul>
        <button
          onClick={() => setOpen(false)}
          className="mt-4 rounded-md px-3 py-2 border border-white/10 text-sm"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

/* =========================
   Easter-egg Terminal (press ~)
========================= */
function EggTerminal({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [lines, setLines] = useState<string[]>(["type 'help' to see commands."]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);
  if (!open) return null;

  function run(cmd: string) {
    const c = cmd.trim().toLowerCase();
    const add = (s: string) => setLines((L) => [...L, s]);
    if (!c) return;
    switch (c) {
      case "help":
        add("commands: help, whoami, skills, projects, contact, clear");
        break;
      case "whoami":
        add("Aayush Kumar — software engineer focused on AI, data, and polished products.");
        break;
      case "skills":
        add(Object.entries(skills).map(([k, v]) => `${k}: ${v.join(", ")}`).join(" | "));
        break;
      case "projects":
        add(projects.map((p) => `${p.title} -> /projects/${p.slug}`).join(" | "));
        break;
      case "contact":
        add(`email: ${CONFIG.email}`);
        navigator.clipboard?.writeText(CONFIG.email).catch(() => {});
        break;
      case "clear":
        setLines([]);
        break;
      default:
        add(`unknown: ${c}`);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = (inputRef.current?.value || "").trim();
    if (!val) return;
    setLines((L) => [...L, `> ${val}`]);
    run(val);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div
        className="mx-auto mt-24 max-w-2xl rounded-lg border border-white/10 bg-zinc-900 text-zinc-100 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-sm font-medium mb-2">
          <TerminalSquare className="h-4 w-4" /> Terminal — press Esc to close
        </div>
        <div className="h-56 overflow-y-auto rounded-md border border-white/10 bg-black/40 p-3 text-sm font-mono">
          {lines.map((ln, i) => (
            <div key={i} className="text-zinc-200">
              {ln}
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
          <span className="text-xs text-zinc-500">$</span>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none text-sm px-2 py-1 rounded border border-white/10"
            placeholder="type a command…"
          />
          <button className="rounded px-3 py-1.5 border border-white/10 text-sm">Run</button>
        </form>
      </div>
    </div>
  );
}

/* =========================
   Command Palette (⌘K)
========================= */
function CommandPalette({
  open,
  setOpen,
  onSelect,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSelect: (href: string | null, action?: string) => void;
}) {
  const [q, setQ] = useState("");
  const items = [
    // Actions
    { type: "Action", label: "Toggle design grid", action: "toggle-grid", icon: Grid3X3 },
    { type: "Action", label: "Copy email to clipboard", action: "copy-email", icon: Mail },
    { type: "Action", label: "Print resume", action: "print-resume", icon: FileText },
    { type: "Action", label: "Open random project", action: "random-project", icon: Rocket },
    { type: "Action", label: "Surprise me", action: "surprise", icon: ExternalLink },
    // Navigation
    ...nav.map((n) => ({ type: "Section", label: n.label, href: `#${n.id}` })),
    ...projects.map((p) => ({ type: "Project", label: p.title, href: `/projects/${p.slug}` })),
  ];
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())).slice(0, 10);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div
        className="mx-auto mt-24 max-w-xl rounded-lg border border-white/10 bg-zinc-900 text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
          <Keyboard className="h-4 w-4 text-zinc-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search or run an action… (type)"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
        <ul className="py-2 max-h-80 overflow-y-auto">
          {filtered.map((i, idx) => {
            const Icon = (i as any).icon;
            return (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-white/5 text-sm cursor-pointer flex items-center gap-2"
                onClick={() => {
                  setOpen(false);
                  onSelect((i as any).href ?? null, (i as any).action);
                }}
              >
                {Icon && <Icon className="h-4 w-4 text-zinc-400" />}
                <span className="text-zinc-400 mr-2">{i.type}</span>
                {i.label}
              </li>
            );
          })}
          {!filtered.length && (
            <li className="px-4 py-6 text-center text-xs text-zinc-500">No matches</li>
          )}
        </ul>
      </div>
    </div>
  );
}

/* =========================
   Dev asserts
========================= */
function DevChecks() {
  useEffect(() => {
    console.assert(CONFIG.email.includes("@"), "CONFIG.email should be valid");
    console.assert(CONFIG.linkedin.startsWith("http"), "CONFIG.linkedin should be a URL");
  }, []);
  return null;
}

/* =========================
   Page
========================= */
export default function PersonalSite() {
  const year = useMemo(() => new Date().getFullYear(), []);

  // UI states
  const [cmd, setCmd] = useState(false);
  const [tour, setTour] = useState(false);
  const [grid, setGrid] = useState(false);
  const [term, setTerm] = useState(false);

  // global hotkeys: ⌘/Ctrl+K, ?, ~, Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key;
      if ((e.metaKey || e.ctrlKey) && key.toLowerCase() === "k") {
        e.preventDefault();
        setCmd((v) => !v);
        return;
      }
      if (key === "?") {
        e.preventDefault();
        setTour((v) => !v);
        return;
      }
      if (key === "~") {
        e.preventDefault();
        setTerm((v) => !v);
        return;
      }
      if (key === "Escape") {
        setCmd(false);
        setTour(false);
        setTerm(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handlePaletteSelect(href: string | null, action?: string) {
    if (href) {
      if (href.startsWith("#")) location.assign(href);
      else location.assign(href);
      return;
    }
    switch (action) {
      case "toggle-grid":
        setGrid((v) => !v);
        break;
      case "copy-email":
        navigator.clipboard?.writeText(CONFIG.email);
        break;
      case "print-resume": {
        const w = window.open(CONFIG.resumeUrl, "_blank");
        if (w) w.focus();
        break;
      }
      case "random-project": {
        const p = projects[Math.floor(Math.random() * projects.length)];
        location.assign(`/projects/${p.slug}`);
        break;
      }
      case "surprise": {
        const options = ["#about", "#skills", "#projects", "#now", "#experience", "#contact"];
        const r = options[Math.floor(Math.random() * options.length)];
        location.assign(r);
        break;
      }
    }
  }

  // styles
  const titleGrad = 
    "bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-purple-300";
  const accentChip = 
    "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1";
  const card =
  "rounded-lg ring-1 ring-white/10 p-6 bg-white/[0.06] backdrop-blur shadow-2xl shadow-black/30 hover:ring-white/20 transition";
  const btn =
    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm border border-white/10 bg-white/5 transition hover:bg-white/10 hover:shadow-[0_10px_30px_-10px_rgba(56,189,248,0.25)] hover:-translate-y-0.5";
  const experienceTimeline = [
    {
      kind: "Experience",
      company: "FACT Professional Inc",
      role: "Data/Software Intern",
      dates: "Jun 2021 – Aug 2021",
      type: "Internship",
      accent: "from-emerald-300 to-cyan-300",
      marker: Database,
      points: [
        "Automated internal workflows with SQL queries and Excel macros for financial reconciliation.",
        "Designed spreadsheet and database systems for payments, checks, and bank statement tracking.",
        "Applied data analysis to identify reporting inconsistencies and recommend process improvements.",
      ],
      tags: ["SQL", "Excel", "DBMS", "Automation"],
    },
    {
      kind: "Education",
      company: "Arizona State University",
      role: "B.S. in Computer Science",
      dates: "Aug 2022 – Dec 2025",
      type: "Education",
      accent: "from-cyan-200 to-emerald-300",
      marker: GraduationIcon,
      points: [
        "Graduated with GPA 3.74 and Dean's List recognition.",
        "Focused on software engineering fundamentals, databases, AI/ML, systems, and algorithms.",
      ],
      tags: ["GPA 3.74", "Dean's List", "CS"],
    },
    {
      kind: "Experience",
      company: "Arizona State University",
      role: "Software Engineering Intern",
      dates: "May 2025 – Dec 2025",
      type: "Internship",
      accent: "from-amber-200 to-rose-300",
      marker: Code,
      points: [
        "Delivered a full-stack stock compensation platform using Django, React, and PostgreSQL.",
        "Built secure REST APIs, onboarding flows, JWT + 2FA auth, CI/CD, and Render deployments.",
        "Integrated an OpenAI-powered assistant for valuation questions and decision support.",
      ],
      tags: ["Django", "React", "PostgreSQL", "OpenAI"],
    },
    {
      kind: "Experience",
      company: "The Net VR",
      role: "Software Engineering Intern",
      dates: "Aug 2025 – Oct 2025",
      type: "Internship",
      accent: "from-fuchsia-300 to-purple-300",
      marker: Boxes,
      points: [
        "Shipped cross-platform VR and mobile features in Unity, C#, and React Native for a closed beta of 1K+ users.",
        "Built an AI companion service with Flask REST APIs, NoSQL, and a WebSocket bridge for 5K+ real-time assistant requests.",
        "Dockerized backend services, standardized local environments and CI checks, and improved Unity frame timing by 15%.",
      ],
      tags: ["Unity", "C#", "React Native", "Flask"],
    },
    {
      kind: "Experience",
      company: "Insurity",
      role: "AI Associate Developer Intern",
      dates: "Oct 2025 – Feb 2026",
      type: "Internship",
      accent: "from-sky-300 to-violet-300",
      marker: Cpu,
      points: [
        "Contributed to AI-assisted product functionality with Angular, .NET, backend services, and production code changes.",
        "Worked on retrieval and relevance improvements for AI-driven workflows.",
        "Debugged Azure DevOps and CI/CD issues while collaborating through PRs and team reviews.",
      ],
      tags: ["Angular", ".NET", "AI workflows", "Azure DevOps"],
    },
    {
      kind: "Experience",
      company: "Insurity",
      role: "AI Solution Analyst",
      dates: "Mar 2026 – Present",
      type: "Full-time",
      accent: "from-cyan-300 to-fuchsia-300",
      marker: BriefcaseBusiness,
      points: [
        "Work across product logic, workflows, data handling, UI behavior, outputs, and testing in insurance software systems.",
        "Debug technical issues by tracing logs, object models, API behavior, and data flow.",
        "Collaborate with product, QA, delivery, and technical teams to validate platform fixes.",
      ],
      tags: ["Insurance platforms", "Product logic", "Debugging", "QA"],
    },
    {
      kind: "Education",
      company: "Arizona State University",
      role: "M.C.S. in Big Data Systems",
      dates: "Jan 2026 – Dec 2026",
      type: "Education",
      accent: "from-violet-300 to-cyan-300",
      marker: GraduationIcon,
      points: [
        "Accelerated 3.5 + 1 graduate path.",
        "Coursework includes Agentic AI, mobile computing, blockchain applications, data mining, and visualization.",
      ],
      tags: ["Big Data", "Agentic AI", "Data Viz"],
    },
  ];
  const educationItems = experienceTimeline.filter((item) => item.kind === "Education");
  const workItems = experienceTimeline.filter((item) => item.kind === "Experience");

  return (
    <>
      <SplashOverlay />
      <GridOverlay show={grid} />
      <CommandPalette open={cmd} setOpen={setCmd} onSelect={handlePaletteSelect} />
      <QuickTour open={tour} setOpen={setTour} />
      <EggTerminal open={term} setOpen={setTerm} />
      <DevChecks />

      <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 selection:bg-cyan-400/20">
        {/* HERO */}
        <section id="home" className="mx-auto max-w-6xl px-4 pt-24 pb-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <motion.div className="md:col-span-7" initial={fadeUp.initial} animate={fadeUp.animate}>
              <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{CONFIG.location}</span>
              </div>
              <h1 className="mt-4 text-4xl/tight md:text-5xl/tight font-semibold tracking-tight">
                {CONFIG.tagline}
              </h1>
              <p className="mt-4 text-zinc-300 leading-relaxed max-w-[60ch]">
                I’m Aayush, a software engineer building across AI, data, and product-focused systems.
                I like tools that feel polished, solve real problems, and make complex workflows easier to use.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#projects" className={btn}>
                  See my work <ArrowRight className="h-4 w-4" />
                </a>
                <a href={`mailto:${CONFIG.email}`} className={btn}>
                  <Mail className="h-4 w-4" /> Contact
                </a>
                <a href={CONFIG.resumeUrl} target="_blank" rel="noopener noreferrer" className={btn}>
                  <FileText className="h-4 w-4" /> View Resume
                </a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-zinc-400">
                <a aria-label="GitHub" href={CONFIG.github} className="hover:opacity-80">
                  <Github className="h-5 w-5" />
                </a>
                <a aria-label="LinkedIn" href={CONFIG.linkedin} className="hover:opacity-80">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a aria-label="Email" href={`mailto:${CONFIG.email}`} className="hover:opacity-80">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            {/* Insurity card */}
            <motion.div className="md:col-span-5" initial={fadeUp.initial} animate={fadeUp.animate} transition={{ delay: 0.1 }}>
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-fuchsia-500/20 to-purple-500/20 blur-2xl animate-pulse" />
                <div className={card}>
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 grid place-items-center">
                      <Image src="/insurity.svg" alt="Insurity" width={56} height={56} className="h-full w-full object-contain drop-shadow-sm" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-cyan-400/90 font-semibold">Currently</p>
                      <p className="text-base font-semibold">
                        AI Solution Analyst <span className="text-zinc-500">@ Insurity</span>
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 text-sm leading-6 list-disc ml-4 text-zinc-300">
                    <li>Configure product logic, workflows, UI behavior, data handling, and outputs.</li>
                    <li>Trace technical issues through logs, APIs, object models, and data flow.</li>
                    <li>Validate fixes with QA-minded testing across policy and underwriting systems.</li>
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-white/10 bg-white/5">
                      Full-time • Since Mar 2026
                    </span>
                  </div>
                  <div className="mt-6">
                    <a
                      href={CONFIG.resumeUrl}
                      download
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                      <Download className="h-4 w-4" /> Download résumé
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h2 className={`section-title ${titleGrad} text-xl md:text-2xl font-semibold tracking-tight`}style={{ ["--hlw" as any]: "140px" }}>About</h2>
              <p className="mt-3 text-sm text-zinc-400 max-w-[28ch]">Software, data, and product work with a technical edge.</p>
            </div>
            <motion.div className="md:col-span-8 text-zinc-300" initial={fadeUp.initial} animate={fadeUp.animate}>
              <p className="leading-relaxed">
                I build polished software products across AI, data, and full-stack development. My favorite work lives
                where implementation, product logic, and user experience all have to line up.
              </p>
              <p className="mt-4 leading-relaxed">
                At Insurity, I work in an insurance software environment where the job is technical problem solving:
                platform configuration, debugging, APIs, data flow, output generation, testing, and making business
                rules behave correctly in real product workflows.
              </p>
              <p className="mt-4 leading-relaxed">
                I completed my B.S. in Computer Science at Arizona State University and am continuing my M.C.S. in Big
                Data Systems through an accelerated 3.5 + 1 path, with a focus on software, data, and applied AI systems.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <Chip icon={GraduationCap} tone="cyan">B.S. Computer Science — ASU</Chip>
                <Chip icon={Award} tone="fuchsia">Dean&apos;s List • GPA 3.74</Chip>
                <Chip icon={Award} tone="fuchsia">Product-minded engineering</Chip>
                <Chip icon={GraduationCap} tone="purple">M.C.S. Big Data Systems — ASU, Dec 2026</Chip>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <QuoteCard
  className="mt-6 md:col-span-8"
  items={[
    "If it works, don’t ask why.",
    "Gym? I thought you said gin.",
    "Working hard or hardly awake.",
    "I don’t have a plan, just a good playlist.",
    "Mentally 25, financially 12.",
  ]}
/>
              <div className="flex items-center justify-between">
  <div className="flex items-center gap-1 text-[11px] text-zinc-400">
    
  </div>
</div>
            </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h2 className={`section-title ${titleGrad} text-xl md:text-2xl font-semibold tracking-tight`}style={{ ["--hlw" as any]: "140px" }}>Skills</h2>
              <p className="mt-3 text-sm text-zinc-400 max-w-[28ch]">The stack I use for product, AI, and data work.</p>
            </div>
            <motion.div className="md:col-span-8" initial={fadeUp.initial} animate={fadeUp.animate}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skills).map(([group, items]) => {
                  const Icon = skillIcons[group] ?? Code;
                  return (
                    <div key={group} className={card}>
                      <p className="font-medium flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {group}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {items.map((t) => (
                          <span key={t} className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex items-center justify-between">
            <h2 className={`section-title ${titleGrad} text-xl md:text-2xl font-semibold tracking-tight`}style={{ ["--hlw" as any]: "140px" }}>Selected Projects</h2>
            <a href={CONFIG.github} className="text-sm inline-flex items-center gap-1 hover:opacity-80">
              All repos <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <motion.div
            className="mt-6 grid md:grid-cols-2 xl:grid-cols-4 gap-6"
            initial="initial"
            animate="animate"
            variants={{ initial: {}, animate: { transition: { staggerChildren: 0.08 } } }}
            onMouseMove={(e: any) => {
              const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width) * 100;
              document.documentElement.style.setProperty("--x", `${x}%`);
            }}
          >
            {projects.map((p) => {
              const caseStudyHref = `/projects/${p.slug}`;
              return (
                <motion.article
                  key={p.title}
                  className={`${card} relative group overflow-hidden`}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {/* glow follows cursor */}
                  <div className="pointer-events-none absolute -inset-20 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(30rem_30rem_at_var(--x,50%)_0%,rgba(56,189,248,0.10),transparent)]" />
                  <a href={caseStudyHref} className="absolute inset-0 rounded-lg" aria-label={`Read case study: ${p.title}`} />
                  {p.image ? (
                    <div className="pointer-events-none relative z-10 mb-4 h-44 overflow-hidden rounded-lg border border-white/10 bg-black/30">
                      <Image
                        src={p.image.src}
                        alt={p.image.alt}
                        fill
                        sizes="(min-width: 1280px) 260px, (min-width: 768px) 45vw, 90vw"
                        className="object-cover object-top opacity-95"
                      />
                      {p.icon && (
                        <div className="absolute left-3 top-3 h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-white/20 shadow-xl">
                          <Image src={p.icon.src} alt={p.icon.alt} width={48} height={48} className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                  ) : p.icon ? (
                    <div className="pointer-events-none relative z-10 mb-4 grid h-44 place-items-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#263392] via-[#19255f] to-[#050b25]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(168,85,247,0.28),transparent_34%),radial-gradient(circle_at_65%_70%,rgba(34,211,238,0.18),transparent_42%)]" />
                      <Image
                        src={p.icon.src}
                        alt={p.icon.alt}
                        width={116}
                        height={116}
                        className="relative h-28 w-28 rounded-[28px] object-cover shadow-2xl ring-1 ring-white/20"
                      />
                    </div>
                  ) : null}
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                    <Rocket className="h-4 w-4" /> {p.title}
                  </div>
                  <p className="mt-3 text-sm text-zinc-300 min-h-[84px]">{p.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="relative z-10 mt-4 flex flex-wrap gap-2 text-xs">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex whitespace-nowrap rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 font-medium text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-300/15"
                      >
                        {l.label === "App Store" ? "View on App Store" : l.label}
                        <ExternalLink className="ml-1.5 h-3.5 w-3.5 shrink-0" />
                      </a>
                    ))}
                    <a
                      href={caseStudyHref}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex whitespace-nowrap rounded-md border border-white/10 bg-white/5 px-3 py-2 font-medium text-zinc-100 transition hover:border-white/20 hover:bg-white/10"
                    >
                      Read the case study
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        {/* NOW (replaces Blog) */}
    
<Changelog
  updated="Apr 2026"
  intro="What I’m focused on now: real platform work, sharper product systems, and cleaner proof of what I can build."
  items={[
    {
      tag: "WORK",
      title: "Insurance platform logic at Insurity",
      note: "Configuration, workflows, data mapping, output generation, debugging, and validation across policy systems.",
    },
    {
      tag: "BUILDING",
      title: "Richish",
      note: "A privacy-first SwiftUI wealth tracking app built around manual control, clean UX, and local-first insights.",
    },
    {
      tag: "LEARNING",
      title: "Big Data Systems",
      note: "Continuing my M.C.S. at ASU with a focus on software, data systems, and applied AI.",
    },
    {
      tag: "BUILDING",
      title: "AI and data workflows",
      note: "ETL-style projects, model experiments, analytics surfaces, and deployment exploration on AWS.",
      href: "#projects",
    },
    {
      tag: "SHIPPING",
      title: "Portfolio clarity",
      note: "Keeping the site current so recruiters can quickly see the product, AI, data, and production experience thread.",
    },
  ]}
/>

        {/* EXPERIENCE & EDUCATION */}
        <section id="experience" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div>
            <h2 className={`section-title ${titleGrad} text-xl md:text-2xl font-semibold tracking-tight`}style={{ ["--hlw" as any]: "140px" }}>Experience & Education</h2>
            <div className="mt-2 h-[2px] w-24 rounded-full bg-gradient-to-r from-cyan-400/60 via-fuchsia-400/50 to-purple-400/60" />
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30">
            <div className="h-[680px] overflow-x-auto overflow-y-hidden px-6 py-6 [scrollbar-color:rgba(34,211,238,0.45)_transparent]">
              <div className="relative flex min-w-max gap-10 pr-10">
                <div className="absolute left-0 right-0 top-[300px] h-px bg-gradient-to-r from-emerald-300 via-cyan-300 via-fuchsia-300 to-violet-300 opacity-80" />
                {experienceTimeline.map((item) => {
                  const isEducation = item.kind === "Education";
                  const MarkerIcon = item.marker;
                  return (
                    <motion.article
                      key={`${item.company}-${item.role}`}
                      variants={fadeUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, margin: "-80px" }}
                      className="relative grid h-[620px] w-[500px] shrink-0 grid-rows-[260px_80px_280px]"
                    >
                      {isEducation ? (
                        <div className="row-start-1 self-end">
                          <TimelineCard item={item} isEducation />
                        </div>
                      ) : (
                        <div className="row-start-3 self-start">
                          <TimelineCard item={item} />
                        </div>
                      )}

                      <div className={`absolute left-1/2 top-[280px] z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br ${item.accent} p-px shadow-[0_0_34px_rgba(34,211,238,0.3)]`}>
                        <span className="grid h-full w-full place-items-center rounded-full bg-zinc-950 text-white">
                          <MarkerIcon className="h-4 w-4" />
                        </span>
                      </div>

                      <div className={`absolute left-1/2 w-px -translate-x-1/2 bg-gradient-to-b ${item.accent} opacity-80 ${isEducation ? "top-[260px] h-5" : "top-[320px] h-5"}`} />
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className={card}>
            <h2 className={`section-title ${titleGrad} text-xl md:text-2xl font-semibold tracking-tight`}style={{ ["--hlw" as any]: "140px" }}>Let’s connect</h2>
            <div className="mt-2 h-[2px] w-24 rounded-full bg-gradient-to-r from-cyan-400/60 via-fuchsia-400/50 to-purple-400/60" />
            <p className="mt-2 text-zinc-300 max-w-[60ch]">
              I’m open to software engineering, AI/ML, and data-focused conversations. Email is best, or use the form.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${CONFIG.email}`} className={btn}>
                  <Mail className="h-4 w-4" /> {CONFIG.email}
                </a>
                <a href={CONFIG.github} className={btn}>
                  <Github className="h-4 w-4" /> @akumar2408
                </a>
                <a href={CONFIG.linkedin} className={btn}>
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        <section aria-label="Workspace" className="mx-auto max-w-5xl px-4 pb-10 md:pb-14">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#08090d] shadow-2xl shadow-black/30">
            <div className="grid gap-4 p-4 sm:grid-cols-2 md:p-5">
              <div className="relative grid aspect-square min-h-[220px] place-items-center overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.08),transparent_38%),linear-gradient(135deg,#07080c,#101116_58%,#07080c)] p-5">
                <div className="h-full max-h-[300px] w-full max-w-[360px] -translate-x-3 md:-translate-x-5">
                  <CodingAnimation type="coding" />
                </div>
              </div>
              <div className="relative grid aspect-square min-h-[220px] place-items-center overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.08),transparent_38%),linear-gradient(135deg,#07080c,#101116_58%,#07080c)] p-5">
                <div className="h-full max-h-[300px] w-full max-w-[360px]">
                  <CodingAnimation type="programmer" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="pb-16 px-4">
          <div className="mx-auto max-w-6xl text-xs text-zinc-400">
            © {year} {CONFIG.name}. Built with Next.js, Tailwind & framer-motion. • Press ⌘K / Ctrl+K • Press ? for a
            tour • Press ~ for terminal
          </div>
        </footer>
      </main>
    </>
  );
}

function TimelineCard({ item, isEducation = false }: { item: any; isEducation?: boolean }) {
  const MarkerIcon = item.marker;

  return (
    <div
      className={[
        "h-full rounded-lg p-4 backdrop-blur transition hover:-translate-y-1",
        isEducation
          ? "border border-emerald-300/25 bg-emerald-300/[0.075] shadow-[0_22px_65px_-40px_rgba(16,185,129,0.9)]"
          : "border border-cyan-300/18 bg-white/[0.065] shadow-[0_22px_65px_-40px_rgba(34,211,238,0.9)]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isEducation ? "text-emerald-200" : "text-cyan-200"}`}>
            {item.kind}
          </p>
          <p className="mt-2 text-base font-semibold text-white">{item.company}</p>
        </div>
        <MarkerIcon className={`h-5 w-5 ${isEducation ? "text-emerald-200" : "text-cyan-200"}`} />
      </div>
      <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight">{item.role}</h3>
      <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-400">{item.dates}</p>
      <ul className="mt-3 space-y-1.5 text-xs leading-5 text-zinc-200">
        {item.points.map((point: string) => (
          <li key={point} className="flex gap-2">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${item.accent}`} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.map((tag: string) => (
          <span key={tag} className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] text-zinc-300">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* =========================
   Contact Form
========================= */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) });
      const j = await res.json();
      if (j.ok) {
        setSent(true);
        form.reset();
      }
    } finally {
      setLoading(false);
    }
  }
  if (sent) return <div className="rounded-lg border border-emerald-300/40 bg-emerald-900/15 p-4 text-sm">Thanks! I’ll get back to you soon.</div>;
  const base = "rounded-md px-3 py-2 border border-white/10 bg-white/5 outline-none";
  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-white/10 p-4 bg-white/5 backdrop-blur grid gap-3 text-sm">
      <input name="name" required placeholder="Your name" className={base} />
      <input name="email" required type="email" placeholder="Your email" className={base} />
      <textarea name="message" required placeholder="What’s up?" rows={4} className={base} />
      <button disabled={loading} className="justify-self-start rounded-md px-4 py-2 border border-white/20 hover:shadow-lg hover:shadow-cyan-500/10 transition-transform hover:-translate-y-0.5">
        {loading ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
