// components/Header.tsx
"use client";

import Link from "next/link";
import { HelpCircle, Sun, MoonStar } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import NavTabs from "./NavTabs";
import MobileNav from "./MobileNav";

// Use absolute-hash hrefs so tabs work universally from any route.
// Keep the id so the home page can still observe sections for "active" state.
const nav = [
  { id: "about",      href: "/#about",      label: "About",      hint: "Who I am + what I do" },
  { id: "skills",     href: "/#skills",     label: "Skills",     hint: "Stacks I use a lot" },
  { id: "projects",   href: "/#projects",   label: "Projects",   hint: "Selected builds & case studies" },
  { id: "now",        href: "/#now",        label: "Now",        hint: "What I’m focused on this month" },
  { id: "experience", href: "/#experience", label: "Experience", hint: "Work + education" },
  { id: "contact",    href: "/#contact",    label: "Contact",    hint: "Say hi" },
];

export default function Header() {
  const pathname = usePathname();

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

  if (pathname !== "/") return null;

  return (
    <>
      {/* gradient progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 z-[60]"
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/82 shadow-[0_18px_50px_-34px_rgba(0,0,0,0.9)] backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/68">
        <div className="mx-auto max-w-7xl px-3 py-2 md:px-4">
          <div className="relative overflow-visible">
            <div className="pointer-events-none absolute inset-x-0 -bottom-2 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />

            <div className="relative flex items-center gap-3 md:gap-4">
              <Link
                href="/"
                prefetch={false}
                className={[
                  "group flex min-w-0 shrink-0 items-center gap-3 pr-1 md:gap-4",
                  "transition hover:drop-shadow-[0_0_16px_rgba(168,85,247,0.24)]"
                ].join(" ")}
              >
                <span className="shrink-0 rounded-full bg-gradient-to-br from-cyan-400 via-fuchsia-400 to-purple-500 p-[2px] shadow-[0_0_30px_-12px_rgba(168,85,247,0.8)]">
                  <span className="relative block h-16 w-16 overflow-hidden rounded-full bg-zinc-950 md:h-20 md:w-20">
                    <Image
                      src="/aayush-headshot.png"
                      alt="Aayush Kumar"
                      fill
                      sizes="(min-width: 768px) 80px, 64px"
                      className="object-cover object-[50%_34%]"
                      priority
                    />
                    <span className="absolute inset-0 rounded-full ring-1 ring-white/12" />
                  </span>
                </span>

                <span className="min-w-0">
                  <span className="block truncate text-[20px] font-semibold leading-none text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-orange-200 to-fuchsia-300 bg-[length:200%_100%] animate-[ak-gradient_10s_linear_infinite] md:text-[24px]">
                    Aayush Kumar
                  </span>
                </span>
              </Link>

              <nav className="hidden min-w-0 flex-1 justify-center lg:flex">
                <NavTabs items={nav} />
              </nav>

              <div className="ml-auto flex shrink-0 items-center gap-2">
                <button
                  aria-label="Quick tour (?)"
                  onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "?" }))}
                  className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:border-white/20 hover:bg-white/[0.06] xl:inline-flex"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>

                <button
                  aria-label="Toggle theme"
                  onClick={() => setDark(v => !v)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  {dark ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
                </button>

                <MobileNav items={nav} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="h-20 md:h-24" aria-hidden="true" />
    </>
  );
}
