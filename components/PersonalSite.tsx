'use client';
import { useEffect, useMemo, useState } from "react";
import {
  Github, Linkedin, Mail, FileText, ArrowRight, MapPin, Cpu, Rocket, ExternalLink,
  Sun, MoonStar, Download, GraduationCap, Award, Briefcase, Code, Server, Database, Boxes, Trophy, Newspaper
} from "lucide-react";
import { motion } from "framer-motion";

const CONFIG = {
  name: "Aayush Kumar",
  tagline: "Builder of practical AI systems and clean, end‑to‑end software.",
  location: "Phoenix • Los Angeles",
  email: "aayushkumar2004@gmail.com",
  resumeUrl: "/Aayush_Kumar_Resume.pdf",
  github: "https://github.com/akumar2408",
  linkedin: "https://www.linkedin.com/in/aayushkumar2/",
};

const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "highlights", label: "Highlights" },
  { id: "blog", label: "Blog" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

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
    title: "Operational Dashboard",
    blurb: "Full‑stack sales analytics (ReactJS + Spring Boot + PostgreSQL) with 30‑day forecasts; improved trend detection accuracy by ~25%.",
    links: [{ label: "GitHub", href: "https://github.com/akumar2408/operationaldashboard/" }],
    tags: ["React", "Spring Boot", "PostgreSQL", "Forecasting"],
  },
  {
    title: "AIInvestMate",
    blurb: "Personal finance ‘coach’ (Next.js + TypeScript + Supabase). Beta used by 50+ students; boosted financial‑literacy engagement by ~40%.",
    links: [
      { label: "Live", href: "https://aiinvestmate.vercel.app" },
      { label: "GitHub", href: "https://github.com/akumar2408/AIInvestMate" },
    ],
    tags: ["Next.js", "Supabase", "OpenAI", "Vercel"],
  },
  {
    title: "SafetyGuardian",
    blurb: "Streaming ETL for safety events (AWS Kinesis → Glue → Redshift) with CI/CD and ~75% test coverage; reliably processes 10K+ events/day.",
    links: [{ label: "GitHub", href: "https://github.com/akumar2408/SafetyGuardian" }],
    tags: ["AWS Kinesis", "Glue", "Redshift", "CI/CD"],
  },
  {
    title: "StockCompSystem (Capstone)",
    blurb: "Multi‑tenant equity platform (Django/DRF, React, PostgreSQL) with 409A workflows, JWT+TOTP 2FA, and AWS RDS.",
    links: [{ label: "Repo", href: "https://github.com/akumar2408/StockCompSystem" }],
    tags: ["Django", "Postgres", "AWS", "2FA", "Chatbot"],
  },
];

const highlights = [
  { icon: Briefcase, title: "Software Engineering Intern", text: "Remote — per résumé." },
  { icon: Award, title: "Capstone — Stock‑Based Compensation System", text: "Tempe, AZ." },
  { icon: Cpu, title: "CI/CD + Test Coverage", text: "AWS (RDS) containers + GitHub Actions; ~75% unit+integration coverage." },
  { icon: Rocket, title: "Safety Guardian (Streaming ETL)", text: "AWS Kinesis • Glue • Redshift." },
  { icon: Trophy, title: "AWS Fundamentals Specialization", text: "Completed Jun 2024." },
  { icon: Boxes, title: "Developer Tools", text: "AWS, Postman, PowerBI, Git, Azure, Docker, Jira, Tableau." },
];

const blogPosts = [
  { title: "Shipping AI Services without the Yak Shave", date: "Sep 2025", summary: "Notes from building a multi‑service stack (gateway + microservices) and keeping it boring + reliable.", href: "#" },
  { title: "From Prototype to Vercel in 30 Minutes", date: "Sep 2025", summary: "My minimal checklist for turning a weekend project into a link I can send to recruiters.", href: "#" },
];

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("prefers-dark");
    const prefers = stored ? stored === "true" : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefers);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("prefers-dark", String(dark));
  }, [dark]);
  return { dark, setDark };
}

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute top-[-10%] left-[-10%] h-[60vmax] w-[60vmax] rounded-full blur-3xl bg-gradient-to-tr from-fuchsia-500/25 via-sky-400/20 to-emerald-400/25"
        animate={{ x: [0, 80, -60, 0], y: [0, -40, 60, 0], rotate: [0, 45, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] h-[50vmax] w-[50vmax] rounded-full blur-3xl bg-gradient-to-tr from-emerald-500/25 via-indigo-400/20 to-cyan-400/25"
        animate={{ x: [0, -90, 50, 0], y: [0, 50, -40, 0], rotate: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const items = [
    ...nav.map((n) => ({ type: "Section", label: n.label, href: `#${n.id}` })),
    ...projects.map((p) => ({ type: "Project", label: p.title, href: `#projects` })),
  ];
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())).slice(0, 8);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="mx-auto mt-24 max-w-xl rounded-2xl border border-zinc-700/50 bg-zinc-900 text-zinc-100" onClick={(e)=>e.stopPropagation()}>
        <div className="px-4 py-3 border-b border-white/10">
          <input autoFocus value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Jump to… (type to search)" className="w-full bg-transparent outline-none text-sm"/>
        </div>
        <ul className="py-2 max-h-80 overflow-y-auto">
          {filtered.map((i, idx) => (
            <li key={idx} className="px-4 py-2 hover:bg-white/5 text-sm cursor-pointer" onClick={()=>{ setOpen(false); const el=document.querySelector(i.href) as HTMLElement|null; el && el.scrollIntoView({behavior:'smooth'}); }}>
              <span className="text-zinc-400 mr-2">{i.type}</span>{i.label}
            </li>
          ))}
          {!filtered.length && <li className="px-4 py-6 text-center text-xs text-zinc-500">No matches</li>}
        </ul>
      </div>
    </div>
  );
}

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
      if (j.ok) { setSent(true); form.reset(); }
    } finally {
      setLoading(false);
    }
  }
  if (sent) return <div className="rounded-2xl border border-emerald-300/50 bg-emerald-50 dark:bg-emerald-900/20 p-4 text-sm">Thanks! I’ll get back to you soon.</div>;
  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/60 dark:bg-zinc-900/50 grid gap-3 text-sm">
      <input name="name" required placeholder="Your name" className="rounded-xl px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none"/>
      <input name="email" required type="email" placeholder="Your email" className="rounded-xl px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none"/>
      <textarea name="message" required placeholder="What’s up?" rows={4} className="rounded-xl px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none"/>
      <button disabled={loading} className="justify-self-start rounded-xl px-4 py-2 border border-zinc-900 dark:border-white">
        {loading ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

function useThemePref() {
  const { dark, setDark } = useTheme();
  return { dark, setDark };
}

function DevChecks() {
  useEffect(() => {
    console.assert(CONFIG.email.includes("@"), "CONFIG.email should be valid");
    console.assert(CONFIG.linkedin.startsWith("http"), "CONFIG.linkedin should be a URL");
  }, []);
  return null;
}

export default function PersonalSite() {
  const { dark, setDark } = useThemePref();
  const year = useMemo(() => new Date().getFullYear(), []);
  const [cmd, setCmd] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmd(v => !v); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <BackgroundFX />
      <CommandPalette open={cmd} setOpen={setCmd} />
      <DevChecks />
      <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900 dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-100 selection:bg-emerald-300/40 dark:selection:bg-emerald-500/30">
        <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-zinc-900/60 border-b border-zinc-200/60 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <a href="#home" className="font-semibold tracking-tight text-lg">{CONFIG.name}</a>
            <nav className="hidden md:flex gap-6 text-sm">
              {nav.map(n => <a key={n.id} href={`#${n.id}`} className="hover:opacity-70">{n.label}</a>)}
            </nav>
            <div className="flex items-center gap-2">
              <button aria-label="Open command palette (⌘K)" onClick={()=>setCmd(True:=False)} className="rounded-xl px-3 py-2 border border-zinc-300 dark:border-zinc-700 text-xs">⌘K</button>
              <button aria-label="Toggle theme" onClick={()=>setDark(!dark)} className="rounded-xl px-3 py-2 border border-zinc-300 dark:border-zinc-700">{dark ? <Sun className="h-4 w-4"/> : <MoonStar className="h-4 w-4"/>}</button>
            </div>
          </div>
        </header>

        <section id="home" className="mx-auto max-w-6xl px-4 pt-16 pb-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <motion.div className="md:col-span-7" initial={fadeUp.initial} animate={fadeUp.animate}>
              <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border border-zinc-300 dark:border-zinc-700">
                <MapPin className="h-3.5 w-3.5" /><span>{CONFIG.location}</span>
              </div>
              <h1 className="mt-4 text-4xl/tight md:text-5xl/tight font-semibold tracking-tight">{CONFIG.tagline}</h1>
              <p className="mt-4 text-zinc-600 dark:text-zinc-300 max-w-[60ch]">I’m {CONFIG.name.split(" ")[0]}, a CS student at ASU and incoming Associate Developer at Insurity. I ship prototypes that turn into useful tools — from multi‑service AI pipelines to production‑ready web backends.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#projects" className="group inline-flex items-center gap-2 rounded-2xl border border-zinc-900 dark:border-white px-4 py-2 text-sm font-medium hover:-translate-y-0.5 transition-transform">See my work <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition"/></a>
                <a href={`mailto:${CONFIG.email}`} className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm hover:-translate-y-0.5 transition-transform"><Mail className="h-4 w-4"/> Contact</a>
                <a href={CONFIG.resumeUrl} className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm hover:-translate-y-0.5 transition-transform"><FileText className="h-4 w-4"/> Resume</a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                <a aria-label="GitHub" href={CONFIG.github} className="hover:opacity-70"><Github className="h-5 w-5"/></a>
                <a aria-label="LinkedIn" href={CONFIG.linkedin} className="hover:opacity-70"><Linkedin className="h-5 w-5"/></a>
                <a aria-label="Email" href={`mailto:${CONFIG.email}`} className="hover:opacity-70"><Mail className="h-5 w-5"/></a>
              </div>
            </motion.div>
            <motion.div className="md:col-span-5" initial={fadeUp.initial} animate={fadeUp.animate} transition={{ delay: 0.1 }}>
              <div className="relative">
                <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-fuchsia-500/20 via-sky-500/20 to-emerald-500/20 blur-2xl animate-pulse"/>
                <div className="relative rounded-[2rem] p-6 border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-zinc-200 dark:bg-zinc-800 grid place-items-center"><Cpu className="h-5 w-5"/></div>
                    <div><p className="text-sm font-semibold">Currently</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Associate Developer @ Insurity</p></div>
                  </div>
                  <ul className="mt-4 text-sm leading-6 list-disc ml-4 text-zinc-700 dark:text-zinc-300">
                    <li>Two‑factor auth (OTP), clean DRF APIs, RDS.</li>
                    <li>AI assistants that answer with precise, structured outputs.</li>
                    <li>Deployments that actually stay up.</li>
                  </ul>
                  <div className="mt-4 flex gap-2"><a href={CONFIG.resumeUrl} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs"><Download className="h-4 w-4"/> Download résumé</a></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4"><h2 className="text-xl font-semibold tracking-tight">About</h2><p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 max-w-[28ch]">Quick background & what I’m into lately.</p></div>
            <motion.div className="md:col-span-8 text-zinc-700 dark:text-zinc-300" initial={fadeUp.initial} animate={fadeUp.animate}>
              <p>I like building systems that are simple to reason about and fast to ship. My sweet spot is tying together AI services with practical web infrastructure so people can actually use the thing.</p>
              <p className="mt-4">On campus, I’m finishing my BS in Computer Science and progressing through ASU’s MCS in Big Data Systems. I’ve led projects spanning mobile sensing, finance UX, and production APIs.</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1"><Award className="h-3.5 w-3.5"/> Barrett Honors</span>
                <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1"><GraduationCap className="h-3.5 w-3.5"/> ASU MCS — BDS</span>
                <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1"><Briefcase className="h-3.5 w-3.5"/> Insurity</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4"><h2 className="text-xl font-semibold tracking-tight">Skills</h2><p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 max-w-[28ch]">Stacks I use to turn ideas into things that ship.</p></div>
            <motion.div className="md:col-span-8" initial={fadeUp.initial} animate={fadeUp.animate}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/50">
                    <p className="font-medium flex items-center gap-2">
                      {group === 'Languages' && <Code className="h-4 w-4"/>}
                      {group === 'Frameworks' && <Boxes className="h-4 w-4"/>}
                      {group === 'Cloud' && <Server className="h-4 w-4"/>}
                      {group === 'Data' && <Database className="h-4 w-4"/>}
                      {group === 'DevOps' && <Cpu className="h-4 w-4"/>}
                      {group === 'AI' && <Rocket className="h-4 w-4"/>}
                      {group}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {items.map((t) => <span key={t} className="text-xs px-2 py-1 rounded-full border border-zinc-300 dark:border-zinc-700">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-center justify-between"><h2 className="text-xl font-semibold tracking-tight">Selected Projects</h2><a href={CONFIG.github} className="text-sm inline-flex items-center gap-1">All repos <ExternalLink className="h-4 w-4"/></a></div>
          <motion.div className="mt-6 grid md:grid-cols-3 gap-6" initial="initial" animate="animate" variants={{ initial: {}, animate: { transition: { staggerChildren: 0.08 } } }}>
            {projects.map((p) => (
              <motion.article key={p.title} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/50 hover:shadow-lg transition-shadow" variants={fadeUp}>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide"><Rocket className="h-4 w-4"/> {p.title}</div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 min-h-[60px]">{p.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="text-xs px-2 py-1 rounded-full border border-zinc-300 dark:border-zinc-700">{t}</span>)}</div>
                <div className="mt-4 flex gap-3 text-sm">{p.links.map((l) => <a key={l.label} href={l.href} className="inline-flex items-center gap-1 hover:opacity-80">{l.label} <ExternalLink className="h-3.5 w-3.5"/></a>)}</div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section id="highlights" className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-center gap-2"><h2 className="text-xl font-semibold tracking-tight">Highlights</h2><span className="text-xs text-zinc-500 dark:text-zinc-400">wins • certs • press</span></div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((h, i) => (
              <motion.div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/50" initial={fadeUp.initial} animate={fadeUp.animate}>
                <div className="flex items-center gap-2"><h.icon className="h-4 w-4"/><p className="font-medium">{h.title}</p></div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{h.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="blog" className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-center gap-2"><h2 className="text-xl font-semibold tracking-tight">Blog</h2><Newspaper className="h-4 w-4"/></div>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/50 hover:shadow-lg transition-shadow" initial={fadeUp.initial} animate={fadeUp.animate}>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{post.date}</p>
                <h3 className="mt-1 font-medium">{post.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{post.summary}</p>
                <a href={post.href} className="mt-3 inline-flex items-center gap-1 text-sm">Read more <ExternalLink className="h-3.5 w-3.5"/></a>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-semibold tracking-tight">Experience & Education</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              { org: "Insurity — Incoming Associate Developer (Oct 2025)", bullets: ["AI training project & internal tooling.", "Automation focus; quick, stable prototypes."] },
              { org: "ASU — BS CS ‘25 • MCS Big Data Systems ‘26", bullets: ["Mobile computing, distributed systems, ML-heavy projects.", "Barrett Honors; capstone on stock-based compensation systems."] }
            ].map((r) => (
              <div key={r.org} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/50">
                <p className="font-medium">{r.org}</p>
                <ul className="mt-3 list-disc ml-5 text-sm text-zinc-700 dark:text-zinc-300">
                  {r.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white/70 dark:bg-zinc-900/40">
            <h2 className="text-xl font-semibold tracking-tight">Let’s build something</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-[60ch]">I’m open to internships, part‑time roles, and interesting side projects in AI, web, or data. The fastest way to reach me is email—or drop a message below.</p>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${CONFIG.email}`} className="inline-flex items-center gap-2 rounded-2xl border border-zinc-900 dark:border-white px-4 py-2 text-sm font-medium"><Mail className="h-4 w-4"/> {CONFIG.email}</a>
                <a href={CONFIG.github} className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm"><Github className="h-4 w-4"/> @akumar2408</a>
                <a href={CONFIG.linkedin} className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm"><Linkedin className="h-4 w-4"/> LinkedIn</a>
              </div>
              <ContactForm/>
            </div>
          </div>
        </section>

        <footer className="pb-16 px-4">
          <div className="mx-auto max-w-6xl text-xs text-zinc-500 dark:text-zinc-400">© {year} {CONFIG.name}. Built with Next.js, Tailwind & framer-motion. • Press ⌘K / Ctrl+K</div>
        </footer>
      </main>
    </>
  );
}
