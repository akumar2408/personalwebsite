'use client';
import { useEffect, useMemo, useState } from "react";
import {
  Github, Linkedin, Mail, FileText, ArrowRight, MapPin, Rocket, ExternalLink,
  Sun, MoonStar, Download, GraduationCap, Award, Code, Server, Database, Boxes, Newspaper
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* =========================
   Basic config
========================= */
const CONFIG = {
  name: "Aayush Kumar",
  tagline: "I like building useful software that feels simple and solid.",
  location: "Phoenix • Los Angeles",
  email: "aayushkumar2004@gmail.com",
  resumeUrl: "/resume.pdf", // <— your file in /public
  github: "https://github.com/akumar2408",
  linkedin: "https://www.linkedin.com/in/aayushkumar2/",
};

const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  // Games is a route (app/games/page.tsx) you can add anytime:
  // It’s linked here in the header nav below.
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
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
    blurb:
      "Full-stack sales analytics with 30-day forecasts. Helped spot trends sooner and keep decisions grounded.",
    links: [{ label: "GitHub", href: "https://github.com/akumar2408/operationaldashboard/" }],
    tags: ["React", "Spring Boot", "PostgreSQL"],
  },
  {
    slug: "aiinvestmate",
    title: "AIInvestMate",
    blurb:
      "Small app that helps students try out investing ideas and learn the basics in a friendly way.",
    links: [
      { label: "Live", href: "https://aiinvestmate.vercel.app" },
      { label: "GitHub", href: "https://github.com/akumar2408/AIInvestMate" },
    ],
    tags: ["Next.js", "Supabase"],
  },
  {
    slug: "streaming-etl",
    title: "SafetyGuardian",
    blurb:
      "Streaming pipeline that moves safety events through AWS and keeps data fresh and reliable.",
    links: [{ label: "GitHub", href: "https://github.com/akumar2408/SafetyGuardian" }],
    tags: ["AWS Kinesis", "Glue", "Redshift", "CI/CD"],
  },
];

const blogPosts = [
  {
    slug: "what-i-actually-do-when-i-build-ai",
    title: "What I actually do when I build AI stuff",
    date: "Oct 2025",
    summary:
      "I start small, ship a tiny end-to-end loop, and only add the fancy pieces after it’s useful.",
    href: "/blog/what-i-actually-do-when-i-build-ai",
  },
  {
    slug: "my-quick-checklist-before-i-ship",
    title: "My quick checklist before I ship",
    date: "Oct 2025",
    summary:
      "A short list I run through before I push: clear readme, good defaults, basic tests, simple logging, and a way to roll back fast.",
    href: "/blog/my-quick-checklist-before-i-ship",
  },
  {
    slug: "one-bug-a-day",
    title: "One bug a day",
    date: "May 2025",
    summary:
      "Fixing one small bug each day taught me more than any tutorial. It kept me honest and moved the work forward.",
    href: "/blog/one-bug-a-day",
  },
  {
    slug: "the-day-i-deleted-half-the-code",
    title: "The day I deleted half the code",
    date: "Dec 2024",
    summary:
      "We kept the parts that mattered and tossed the rest. The app got faster, and so did the team.",
    href: "/blog/the-day-i-deleted-half-the-code",
  },
];

/* =========================
   Theme + Motion
========================= */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("prefers-dark");
    const prefers = stored ? stored === "true" : (window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true);
    setDark(prefers);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("prefers-dark", String(dark));
  }, [dark]);
  return { dark, setDark };
}

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* =========================
   Neo-Noir background blobs
========================= */
function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute top-[-12%] left-[-10%] h-[60vmax] w-[60vmax] rounded-full blur-3xl
                   bg-gradient-to-tr from-cyan-500/20 via-fuchsia-500/15 to-purple-500/20"
        animate={{ x: [0, 80, -60, 0], y: [0, -40, 60, 0], rotate: [0, 45, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-12%] right-[-10%] h-[52vmax] w-[52vmax] rounded-full blur-3xl
                   bg-gradient-to-tr from-purple-500/20 via-cyan-400/15 to-fuchsia-500/20"
        animate={{ x: [0, -90, 50, 0], y: [0, 50, -40, 0], rotate: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* =========================
   Splash Intro (one-time)
========================= */
function SplashIntro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mq?.matches) {
      onDone();
      return;
    }
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(onDone, 1600);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = prev;
    };
  }, [onDone]);

  const letters = Array.from('Aayush Kumar');

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] grid place-items-center bg-black"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        // tiny shimmer on exit
        exit={{ opacity: 0, scale: [1, 1.02, 1], transition: { duration: 0.35 } }}
      >
        {/* ambient blobs */}
        <motion.div
          className="absolute -top-24 -left-24 h-[60vmax] w-[60vmax] rounded-full blur-3xl
                     bg-gradient-to-tr from-cyan-500/25 via-fuchsia-500/20 to-purple-500/25"
          animate={{ x: [0, 60, -40, 0], y: [0, -30, 40, 0], rotate: [0, 30, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -right-28 h-[55vmax] w-[55vmax] rounded-full blur-3xl
                     bg-gradient-to-tr from-purple-500/25 via-cyan-400/20 to-fuchsia-500/25"
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -30, 0], rotate: [0, -25, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative text-center">
          <motion.h1
            className="text-[10vw] md:text-7xl font-semibold tracking-[-0.04em]
                       bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              show:   { transition: { staggerChildren: 0.03 } },
            }}
          >
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { y: 18, opacity: 0, filter: 'blur(6px)' },
                  show:   { y: 0,  opacity: 1, filter: 'blur(0px)', transition: { duration: 0.38, ease: 'easeOut' } }
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-3 text-zinc-300/90 text-sm md:text-base"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.35 } }}
          >
            Incoming — Associate Developer @ Insurity
          </motion.p>
        </div>

        <button
          onClick={onDone}
          className="absolute bottom-6 right-6 text-xs text-zinc-400 hover:text-white/90"
        >
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================
   Command Palette (⌘K)
========================= */
function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const items = [
    ...nav.map((n) => ({ type: "Section", label: n.label, href: `#${n.id}` })),
    ...projects.map((p) => ({ type: "Project", label: p.title, href: `/projects` })),
  ];
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())).slice(0, 8);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="mx-auto mt-24 max-w-xl rounded-[28px] border border-white/10 bg-zinc-900 text-zinc-100" onClick={(e)=>e.stopPropagation()}>
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
      if (j.ok) { setSent(true); form.reset(); }
    } finally {
      setLoading(false);
    }
  }
  if (sent) return <div className="rounded-[28px] border border-emerald-300/40 bg-emerald-900/15 p-4 text-sm">Thanks! I’ll get back to you soon.</div>;
  const base = "rounded-[14px] px-3 py-2 border border-white/10 bg-white/5 outline-none";
  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-white/10 p-4 bg-white/5 backdrop-blur grid gap-3 text-sm">
      <input name="name" required placeholder="Your name" className={base}/>
      <input name="email" required type="email" placeholder="Your email" className={base}/>
      <textarea name="message" required placeholder="What’s up?" rows={4} className={base}/>
      <button disabled={loading} className="justify-self-start rounded-[14px] px-4 py-2 border border-white/20 hover:shadow-lg hover:shadow-cyan-500/10 transition-transform hover:-translate-y-0.5">
        {loading ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

/* =========================
   Dev sanity checks
========================= */
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

/* =========================
   Page
========================= */
export default function PersonalSite() {
  const { dark, setDark } = useThemePref();
  const year = useMemo(() => new Date().getFullYear(), []);
  const [cmd, setCmd] = useState(false);

  // Splash: show once every 12 hours
  const [showSplash, setShowSplash] = useState(false);
  useEffect(() => {
    try {
      const key = 'seen-splash-at';
      const last = localStorage.getItem(key);
      const twelveHours = 1000 * 60 * 60 * 12;
      if (!last || Date.now() - Number(last) > twelveHours) {
        setShowSplash(true);
        localStorage.setItem(key, String(Date.now()));
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmd((v) => !v); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const card = "rounded-[28px] border border-white/10 p-6 bg-white/8 dark:bg-white/5 backdrop-blur shadow-2xl shadow-black/10 dark:shadow-black/40";
  const btn  = "inline-flex items-center gap-2 rounded-[14px] px-4 py-2 text-sm border hover:shadow-lg hover:shadow-cyan-500/10 transition-transform hover:-translate-y-0.5";

  return (
    <>
      {showSplash && <SplashIntro onDone={() => setShowSplash(false)} />}

      <BackgroundFX />
      <CommandPalette open={cmd} setOpen={setCmd} />
      <DevChecks />

      <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900 dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-100 selection:bg-cyan-300/30 dark:selection:bg-cyan-400/25">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-zinc-900/60 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <a href="#home" className="font-semibold tracking-[-0.01em] text-2xl md:text-3xl hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.25)] transition">{CONFIG.name}</a>
            <nav className="hidden md:flex gap-6 text-sm">
              <a href="#about" className="hover:opacity-80">About</a>
              <a href="#skills" className="hover:opacity-80">Skills</a>
              <Link href="/projects" className="hover:opacity-80">Projects</Link>
              <Link href="/blog" className="hover:opacity-80">Blog</Link>
              <Link href="/games" className="hover:opacity-80">Games</Link>
              <a href="#experience" className="hover:opacity-80">Experience</a>
              <a href="#contact" className="hover:opacity-80">Contact</a>
            </nav>
            <div className="flex items-center gap-2">
              <button aria-label="Open command palette (⌘K)" onClick={()=>setCmd(true)} className="rounded-[12px] px-3 py-2 border border-white/10 text-xs">⌘K</button>
              <button aria-label="Toggle theme" onClick={()=>setDark(!dark)} className="rounded-[12px] px-3 py-2 border border-white/10">{dark ? <Sun className="h-4 w-4"/> : <MoonStar className="h-4 w-4"/>}</button>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section id="home" className="mx-auto max-w-6xl px-4 pt-16 pb-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <motion.div className="md:col-span-7" initial={fadeUp.initial} animate={fadeUp.animate}>
              <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5">
                <MapPin className="h-3.5 w-3.5" /><span>{CONFIG.location}</span>
              </div>
              <h1 className="mt-4 text-4xl/tight md:text-5xl/tight font-semibold tracking-tight tracking-[-0.02em]">{CONFIG.tagline}</h1>
              <p className="mt-4 text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-[60ch]">
                I’m Aayush, a CS student who likes turning rough ideas into working software. I care about clear code,
                fast feedback, and keeping things reliable.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#projects" className={`${btn} border-white/20`}>See my work <ArrowRight className="h-4 w-4"/></a>
                <a href={`mailto:${CONFIG.email}`} className={`${btn} border-white/10`}><Mail className="h-4 w-4"/> Contact</a>
                <a href={CONFIG.resumeUrl} target="_blank" rel="noopener noreferrer" className={`${btn} border-white/10`}><FileText className="h-4 w-4"/> View Resume</a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                <a aria-label="GitHub" href={CONFIG.github} className="hover:opacity-80"><Github className="h-5 w-5"/></a>
                <a aria-label="LinkedIn" href={CONFIG.linkedin} className="hover:opacity-80"><Linkedin className="h-5 w-5"/></a>
                <a aria-label="Email" href={`mailto:${CONFIG.email}`} className="hover:opacity-80"><Mail className="h-5 w-5"/></a>
              </div>
            </motion.div>

            {/* Incoming Insurity card */}
            <motion.div className="md:col-span-5" initial={fadeUp.initial} animate={fadeUp.animate} transition={{ delay: 0.1 }}>
              <div className="relative">
                <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-cyan-500/20 via-fuchsia-500/20 to-purple-500/20 blur-2xl animate-pulse"/>
                <div className={`${card}`}>
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 grid place-items-center">
                      <img src="/insurity.svg" alt="Insurity" className="h-full w-full object-contain drop-shadow-sm" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-cyan-400/90 font-semibold">Incoming</p>
                      <p className="text-base font-semibold">Associate Developer <span className="text-zinc-500">@ Insurity</span></p>
                    </div>
                  </div>

                  <ul className="mt-4 text-sm leading-6 list-disc ml-4 text-zinc-300">
                    <li>Build internal tools and APIs that make the team faster.</li>
                    <li>Work on AI-assisted features where they actually help.</li>
                    <li>Focus on clean code, solid tests, and smooth deploys.</li>
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-white/10 bg-white/5">
                      Insurity • Oct 2025
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-white/10 bg-white/5">
                      Incoming Role
                    </span>
                  </div>

                  <div className="mt-6">
                    <a href={CONFIG.resumeUrl} download className="inline-flex items-center gap-2 rounded-[14px] border border-white/20 px-4 py-2 text-sm hover:shadow-lg hover:shadow-cyan-500/10">
                      <Download className="h-4 w-4"/> Download résumé
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h2 className="text-xl font-semibold tracking-tight">About</h2>
              <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 max-w-[28ch]">A little context and what I’m into.</p>
            </div>
            <motion.div className="md:col-span-8 text-zinc-700 dark:text-zinc-300" initial={fadeUp.initial} animate={fadeUp.animate}>
              <p className="leading-relaxed">
                I like small, end-to-end slices that prove the idea. Once it works, I clean it up and make it sturdy.
                Most of my projects mix web, data, and a bit of AI.
              </p>
              <p className="mt-4 leading-relaxed">
                Right now I’m finishing my BS at ASU and working through the MCS Big Data Systems track.
                Outside of classes, I build things for fun and post the ones I’m proud of.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1"><GraduationCap className="h-3.5 w-3.5"/> ASU — BS CS ’25</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1"><Award className="h-3.5 w-3.5"/> Dean’s List (GPA 3.75)</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1"><GraduationCap className="h-3.5 w-3.5"/> ASU — MCS Big Data Systems ’26</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4"><h2 className="text-xl font-semibold tracking-tight">Skills</h2><p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 max-w-[28ch]">Tools I use a lot.</p></div>
            <motion.div className="md:col-span-8" initial={fadeUp.initial} animate={fadeUp.animate}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group} className={card}>
                    <p className="font-medium flex items-center gap-2">
                      {group === 'Languages' && <Code className="h-4 w-4"/>}
                      {group === 'Frameworks' && <Boxes className="h-4 w-4"/>}
                      {group === 'Cloud' && <Server className="h-4 w-4"/>}
                      {group === 'Data' && <Database className="h-4 w-4"/>}
                      {group}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {items.map((t) => <span key={t} className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex items-center justify-between"><h2 className="text-xl font-semibold tracking-tight">Selected Projects</h2><a href={CONFIG.github} className="text-sm inline-flex items-center gap-1 hover:opacity-80">All repos <ExternalLink className="h-4 w-4"/></a></div>
          <motion.div className="mt-6 grid md:grid-cols-3 gap-8" initial="initial" animate="animate" variants={{ initial: {}, animate: { transition: { staggerChildren: 0.08 } } }}>
            {projects.map((p) => (
              <motion.article
                key={p.title}
                className={card}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Link href={`/projects/${p.slug}`} className="block group focus:outline-none">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                    <Rocket className="h-4 w-4"/> {p.title}
                  </div>
                  <p className="mt-3 text-sm text-zinc-300 min-h-[60px]">{p.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5">{t}</span>)}</div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-300 group-hover:underline underline-offset-4">
                    Read the case study <ExternalLink className="h-3.5 w-3.5"/>
                  </span>
                </Link>
                <div className="mt-3 flex gap-3 text-sm">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} className="inline-flex items-center gap-1 hover:opacity-80">
                      {l.label} <ExternalLink className="h-3.5 w-3.5"/>
                    </a>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* BLOG */}
        <section id="blog" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex items-center gap-2"><h2 className="text-xl font-semibold tracking-tight">Blog</h2><Newspaper className="h-4 w-4"/></div>
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article key={i} className={card} initial={fadeUp.initial} animate={fadeUp.animate}>
                <p className="text-xs text-zinc-400">{post.date}</p>
                <h3 className="mt-1 font-medium">{post.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{post.summary}</p>
                <Link href={post.href} className="mt-3 inline-flex items-center gap-1 text-sm hover:underline underline-offset-4">Read more <ExternalLink className="h-3.5 w-3.5"/></Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION */}
        <section id="experience" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h2 className="text-xl font-semibold tracking-tight">Experience & Education</h2>
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
        <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className={card}>
            <h2 className="text-xl font-semibold tracking-tight">Let’s build something</h2>
            <p className="mt-2 text-zinc-300 max-w-[60ch]">
              I’m open to full-time roles, internships, and projects in web, data, or AI. Email is best, or use the form.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${CONFIG.email}`} className={`${btn} border-white/20`}><Mail className="h-4 w-4"/> {CONFIG.email}</a>
                <a href={CONFIG.github} className={`${btn} border-white/10`}><Github className="h-4 w-4"/> @akumar2408</a>
                <a href={CONFIG.linkedin} className={`${btn} border-white/10`}><Linkedin className="h-4 w-4"/> LinkedIn</a>
              </div>
              <ContactForm/>
            </div>
          </div>
        </section>

        <footer className="pb-16 px-4">
          <div className="mx-auto max-w-6xl text-xs text-zinc-400">© {year} {CONFIG.name}. Built with Next.js, Tailwind & framer-motion. • Press ⌘K / Ctrl+K</div>
        </footer>
      </main>
    </>
  );
}
