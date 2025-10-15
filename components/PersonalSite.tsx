"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import {
  Github, Linkedin, Mail, FileText, ArrowRight, MapPin, Rocket, ExternalLink,
  Download, GraduationCap, Award, Code, Server, Database, Boxes,
  TerminalSquare, HelpCircle, Keyboard, Grid3X3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   Basic config
========================= */
const CONFIG = {
  name: "Aayush Kumar",
  tagline: "I like making useful stuff that just works.",
  location: "Phoenix • Los Angeles",
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
  { id: "games", label: "Games", href: "/games", hint: "Tiny side fun" },
  { id: "experience", label: "Experience", hint: "Work + school" },
  { id: "contact", label: "Contact", hint: "Say hi" },
];

/* =========================
   Content
========================= */
const skills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "JavaScript", "SQL", "Go", "C#"],
  Frameworks: ["React", "Next.js", "Django", "FastAPI", "Spring Boot", "React Native", "Tailwind"],
  Cloud: ["AWS", "Vercel", "Supabase", "Azure"],
  Data: ["PostgreSQL", "Redshift", "RDS", "ETL", "pandas"],
  DevOps: ["Docker", "Docker Compose", "Terraform", "Git", "GitHub Actions"],
  AI: ["OpenAI", "YOLO", "Whisper", "Embeddings"],
  BI: ["PowerBI", "Tableau"],
};

const projects = [
  {
    slug: "operational-dashboard",
    title: "Operational Dashboard",
    blurb: "Full-stack sales analytics with 30-day forecasts.",
    links: [{ label: "GitHub", href: "https://github.com/akumar2408/operationaldashboard/" }],
    tags: ["React", "Spring Boot", "PostgreSQL"],
  },
  {
    slug: "aiinvestmate",
    title: "AIInvestMate",
    blurb: "Small app that helps students try out investing ideas.",
    links: [
      { label: "Live", href: "https://ai-invest-mate.vercel.app/" },
      { label: "GitHub", href: "https://github.com/akumar2408/AIInvestMate" },
    ],
    tags: ["Next.js", "Supabase"],
  },
  {
    slug: "streaming-etl",
    title: "SafetyGuardian",
    blurb: "Streaming pipeline for safety events on AWS.",
    links: [{ label: "GitHub", href: "https://github.com/akumar2408/SafetyGuardian" }],
    tags: ["AWS Kinesis", "Glue", "Redshift", "CI/CD"],
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
                  AI Associate Developer @ Insurity
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
        className="mx-auto mt-24 max-w-xl rounded-[28px] border border-white/10 bg-zinc-900 text-zinc-100 p-6"
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
          className="mt-4 rounded-[12px] px-3 py-2 border border-white/10 text-sm"
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
        add("Aayush Kumar — builder of simple, solid software.");
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
        className="mx-auto mt-24 max-w-2xl rounded-[20px] border border-white/10 bg-zinc-900 text-zinc-100 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-sm font-medium mb-2">
          <TerminalSquare className="h-4 w-4" /> Terminal — press Esc to close
        </div>
        <div className="h-56 overflow-y-auto rounded-[12px] border border-white/10 bg-black/40 p-3 text-sm font-mono">
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
    ...nav.map((n) => ({ type: "Section", label: n.label, href: n.href ?? `#${n.id}` })),
    ...projects.map((p) => ({ type: "Project", label: p.title, href: `/projects/${p.slug}` })),
  ];
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())).slice(0, 10);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div
        className="mx-auto mt-24 max-w-xl rounded-[28px] border border-white/10 bg-zinc-900 text-zinc-100"
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
        const options = ["#about", "#skills", "#projects", "#now", "#experience", "#contact", "/games"];
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
  "rounded-[28px] ring-1 ring-white/10 p-6 bg-white/[0.06] backdrop-blur shadow-2xl shadow-black/30 hover:ring-white/20 transition";
  const btn =
    "inline-flex items-center gap-2 rounded-[14px] px-4 py-2 text-sm border border-white/10 bg-white/5 transition hover:bg-white/10 hover:shadow-[0_10px_30px_-10px_rgba(56,189,248,0.25)] hover:-translate-y-0.5";

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
              <h1 className="mt-4 text-4xl/tight md:text-5xl/tight font-semibold tracking-tight tracking-[-0.02em]">
                {CONFIG.tagline}
              </h1>
              <p className="mt-4 text-zinc-300 leading-relaxed max-w-[60ch]">
                I’m Aayush, working at Insurity on AI-driven tools that make insurance software smarter. When I’m not
                coding, I’m usually exploring new ideas in machine learning and system design.
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
                <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-cyan-500/20 via-fuchsia-500/20 to-purple-500/20 blur-2xl animate-pulse" />
                <div className={card}>
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 grid place-items-center">
                      <img src="/insurity.svg" alt="Insurity" className="h-full w-full object-contain drop-shadow-sm" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-cyan-400/90 font-semibold">Currently</p>
                      <p className="text-base font-semibold">
                        AI Associate Developer <span className="text-zinc-500">@ Insurity</span>
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 text-sm leading-6 list-disc ml-4 text-zinc-300">
                    <li>Work with the AI Solutions team on smarter tools.</li>
                    <li>Build features that make real work easier.</li>
                    <li>Focus on clarity, testing, and smooth deploys.</li>
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-white/10 bg-white/5">
                      Insurity • Oct 2025
                    </span>
                  </div>
                  <div className="mt-6">
                    <a
                      href={CONFIG.resumeUrl}
                      download
                      className="inline-flex items-center gap-2 rounded-[14px] border border-white/20 px-4 py-2 text-sm hover:shadow-lg hover:shadow-cyan-500/10"
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
              <p className="mt-3 text-sm text-zinc-400 max-w-[28ch]">A little context and what I’m into.</p>
            </div>
            <motion.div className="md:col-span-8 text-zinc-300" initial={fadeUp.initial} animate={fadeUp.animate}>
              <p className="leading-relaxed">
                I like building small, end-to-end things that prove an idea works. Once it does, I polish it up and make
                it solid. Most of what I build mixes web, data, and a bit of AI.
              </p>
              <p className="mt-4 leading-relaxed">
                Right now I’m finishing my BS at ASU and working through the MCS Big Data Systems track. Outside of
                classes, I build things for fun and post the ones I’m proud of.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <Chip icon={GraduationCap} tone="cyan">ASU — BS CS ’25</Chip>
                <Chip icon={Award} tone="fuchsia">Dean’s List (GPA 3.75)</Chip>
                <Chip icon={GraduationCap} tone="purple">ASU — MCS Big Data Systems ’26</Chip>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h2 className={`section-title ${titleGrad} text-xl md:text-2xl font-semibold tracking-tight`}style={{ ["--hlw" as any]: "140px" }}>Skills</h2>
              <p className="mt-3 text-sm text-zinc-400 max-w-[28ch]">Tools I use a lot.</p>
            </div>
            <motion.div className="md:col-span-8" initial={fadeUp.initial} animate={fadeUp.animate}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group} className={card}>
                    <p className="font-medium flex items-center gap-2">
                      {group === "Languages" && <Code className="h-4 w-4" />}
                      {group === "Frameworks" && <Boxes className="h-4 w-4" />}
                      {group === "Cloud" && <Server className="h-4 w-4" />}
                      {group === "Data" && <Database className="h-4 w-4" />}
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
                ))}
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
            className="mt-6 grid md:grid-cols-3 gap-8"
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
                  <a href={caseStudyHref} className="absolute inset-0 rounded-[28px]" aria-label={`Read case study: ${p.title}`} />
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                    <Rocket className="h-4 w-4" /> {p.title}
                  </div>
                  <p className="mt-3 text-sm text-zinc-300 min-h-[60px]">{p.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3 text-sm relative z-10">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 hover:opacity-80"
                      >
                        {l.label} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ))}
                    <a
                      href={caseStudyHref}
                      onClick={(e) => e.stopPropagation()}
                      className="ml-auto underline underline-offset-4 opacity-90 group-hover:opacity-100"
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
        <section id="now" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex items-center gap-2">
            <h2 className={`section-title ${titleGrad} text-xl md:text-2xl font-semibold tracking-tight`}style={{ ["--hlw" as any]: "140px" }}>Now</h2>
            <span className="text-xs text-zinc-400">What I’m focused on this month</span>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-8">
            <div className={card}>
              <p className="text-xs text-cyan-300">AI + Product</p>
              <h3 className="mt-1 font-medium">Building smarter AI tools that feel useful</h3>
              <p className="mt-2 text-sm text-zinc-300">
              Playing with RAG setups, vector search, and OpenAI APIs to make small tools that genuinely help — not just look cool. I’m testing ideas around document Q&A, quick insight generation, and productivity bots that I’d actually use daily.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs text-fuchsia-300">Data Systems</p>
              <h3 className="mt-1 font-medium">ETL that’s boring (on purpose)</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Cleaner Airflow DAGs, better logs, and pipelines into PostgreSQL/Redshift that don’t wake you at 2am.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs text-purple-300">Shipping</p>
              <h3 className="mt-1 font-medium">Polish &gt; scope</h3>
              <p className="mt-2 text-sm text-zinc-300">
              Focusing on refining what I already have — better UX in my personal site, smoother project demos, and clearer readmes. Less “coming soon,” more “works right now.”
              </p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION */}
        <section id="experience" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h2 className={`section-title ${titleGrad} text-xl md:text-2xl font-semibold tracking-tight`}style={{ ["--hlw" as any]: "140px" }}>Experience & Education</h2>
          <div className="mt-2 h-[2px] w-24 rounded-full bg-gradient-to-r from-cyan-400/60 via-fuchsia-400/50 to-purple-400/60" />
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <div className={card}>
              <p className="font-medium">The Net VR — Software Engineering Intern</p>
              <p className="text-xs text-zinc-400 mt-0.5">Aug 2025 – Present • Remote</p>
              <ul className="mt-3 list-disc ml-5 text-sm text-zinc-300">
                <li>Shipped cross-platform VR and mobile features with Unity and React Native.</li>
                <li>Built an AI companion service with Flask and a WebSocket bridge.</li>
                <li>Dockerized services, added CI checks, and improved performance.</li>
              </ul>
            </div>
            <div className={card}>
              <p className="font-medium">Endless Moments — Software Engineering Intern</p>
              <p className="text-xs text-zinc-400 mt-0.5">May 2025 – Present • Tempe, AZ</p>
              <ul className="mt-3 list-disc ml-5 text-sm text-zinc-300">
                <li>Co-built a multi-tenant stock-based compensation system (Django/DRF, React, PostgreSQL).</li>
                <li>Designed clean data models and a reliable ETL path into Redshift.</li>
                <li>Hardened auth (JWT + TOTP), added CI, and containerized deploys on AWS.</li>
              </ul>
            </div>
            <div className={card}>
              <p className="font-medium">Arizona State University — BS Computer Science</p>
              <p className="text-xs text-zinc-400 mt-0.5">Tempe, AZ • Dec 2025</p>
              <ul className="mt-3 list-disc ml-5 text-sm text-zinc-300">
                <li>Dean’s List • GPA 3.75</li>
                <li>Courses: AI/ML, Operating Systems, Networks, Cloud, DS&A, Databases</li>
              </ul>
            </div>
            <div className={card}>
              <p className="font-medium">Arizona State University — MCS, Big Data Systems</p>
              <p className="text-xs text-zinc-400 mt-0.5">Online • Dec 2026</p>
              <ul className="mt-3 list-disc ml-5 text-sm text-zinc-300">
                <li>Mobile Computing, Data Viz, HCI, AI Agents & Agentic AI</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className={card}>
            <h2 className={`section-title ${titleGrad} text-xl md:text-2xl font-semibold tracking-tight`}style={{ ["--hlw" as any]: "140px" }}>Let’s build something</h2>
            <div className="mt-2 h-[2px] w-24 rounded-full bg-gradient-to-r from-cyan-400/60 via-fuchsia-400/50 to-purple-400/60" />
            <p className="mt-2 text-zinc-300 max-w-[60ch]">
              I’m open to full-time roles, internships, and projects in web, data, or AI. Email is best, or use the form.
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
  if (sent) return <div className="rounded-[28px] border border-emerald-300/40 bg-emerald-900/15 p-4 text-sm">Thanks! I’ll get back to you soon.</div>;
  const base = "rounded-[14px] px-3 py-2 border border-white/10 bg-white/5 outline-none";
  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-white/10 p-4 bg-white/5 backdrop-blur grid gap-3 text-sm">
      <input name="name" required placeholder="Your name" className={base} />
      <input name="email" required type="email" placeholder="Your email" className={base} />
      <textarea name="message" required placeholder="What’s up?" rows={4} className={base} />
      <button disabled={loading} className="justify-self-start rounded-[14px] px-4 py-2 border border-white/20 hover:shadow-lg hover:shadow-cyan-500/10 transition-transform hover:-translate-y-0.5">
        {loading ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
