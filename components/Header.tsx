"use client";

import { HelpCircle, Sun, MoonStar } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import NavTabs from "./NavTabs";
import MobileNav from "./MobileNav";

const nav = [
  { id: "about",      href: "/#about",      label: "About",      hint: "Who I am + what I do" },
  { id: "skills",     href: "/#skills",     label: "Skills",     hint: "Stacks I use a lot" },
  { id: "projects",   href: "/#projects",   label: "Projects",   hint: "Selected builds & case studies" },
  { id: "now",        href: "/#now",        label: "Now",        hint: "What I’m focused on this month" },
  {                   href: "/games",       label: "Games",      hint: "Tiny side fun" },
  { id: "experience", href: "/#experience", label: "Experience", hint: "Work + school" },
  { id: "contact",    href: "/#contact",    label: "Contact",    hint: "Say hi" },
];

export default function Header() {
  // theme toggle persisted
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem("prefers-dark");
    setDark(stored ? stored === "true" : true);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("prefers-dark", String(dark));
  }, [dark]);

  // scroll progress bar
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* gradient progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 z-[60]"
      />

      <header className="sticky top-0 z-50 backdrop-blur bg-zinc-950/75 border-b border-white/10
        after:block after:h-px after:w-full after:bg-gradient-to-r after:from-cyan-400/25 after:via-fuchsia-400/15 after:to-purple-400/25">
        <Link
  href="/"
  prefetch={false}
  className={[
    "font-semibold tracking-[-0.01em] text-[22px] md:text-[28px]",
    // gradient text
    "text-transparent bg-clip-text bg-gradient-to-r",
    "from-rose-400 via-orange-300 to-fuchsia-400",
    // subtle animated shift (optional)
    "bg-[length:200%_100%] animate-[ak-gradient_10s_linear_infinite]",
    // hover glow
    "hover:drop-shadow-[0_0_12px_rgba(244,63,94,0.35)] transition"
  ].join(" ")}
>
  Aayush Kumar
</Link>

          <nav className="hidden md:block">
            <NavTabs items={nav} />
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Quick tour (?)"
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "?" }))}
              className="rounded-[12px] px-3 py-2 border border-white/10 text-xs hidden md:inline-flex"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
            <button
              aria-label="Toggle theme"
              onClick={() => setDark(v => !v)}
              className="rounded-[12px] px-3 py-2 border border-white/10"
            >
              {dark ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </button>

            <MobileNav items={nav} />
          </div>
        </div>
      </header>
    </>
  );
}
