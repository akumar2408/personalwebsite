"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Item = { id?: string; href: string; label: string; hint?: string };

export default function NavTabs({ items }: { items: Item[] }) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>(items.find(i => i.id)?.id ?? "");

  // Track the section currently passing under the fixed header.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") return;

    const ids = items.filter(i => i.id && i.href.startsWith("/#")).map(i => i.id!) ;
    if (!ids.length) return;

    const setActiveFromScroll = () => {
      const marker = window.scrollY + 140;
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= marker) current = id;
      }

      setActiveId(current);
    };

    setActiveFromScroll();
    window.addEventListener("scroll", setActiveFromScroll, { passive: true });
    window.addEventListener("resize", setActiveFromScroll);
    window.addEventListener("hashchange", setActiveFromScroll);

    return () => {
      window.removeEventListener("scroll", setActiveFromScroll);
      window.removeEventListener("resize", setActiveFromScroll);
      window.removeEventListener("hashchange", setActiveFromScroll);
    };
  }, [items]);

  const isRouteActive = (it: Item) => {
    if (it.id && it.href.startsWith("/#")) return (pathname === "/" && activeId === it.id);
    return pathname === it.href;
  };

  return (
    <div className="relative flex max-w-full items-center justify-center gap-7 overflow-visible">
      {items.map((n) => {
        const activeNow = isRouteActive(n);
        return (
          <div
            key={n.label}
            onMouseEnter={() => setHovered(n.label)}
            onMouseLeave={() => setHovered(null)}
            className="relative shrink-0"
          >
            <Link
              prefetch={false}
              href={n.href as any}
              aria-current={activeNow ? "page" : undefined}
              className={[
                "relative z-10 block whitespace-nowrap py-[22px] text-[13px] font-semibold uppercase leading-none tracking-[0.18em] transition duration-200 xl:text-[14px]",
                activeNow
                  ? "text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.28)]"
                  : "text-zinc-400 hover:text-zinc-100",
              ].join(" ")}
              title={n.hint}
            >
              {n.label}
            </Link>

            {activeNow && (
              <>
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 bottom-2 h-[2px] rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 shadow-[0_0_18px_rgba(34,211,238,0.55)]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
                <motion.span
                  layoutId="nav-aura"
                  className="absolute inset-x-[-10px] bottom-0 h-8 rounded-full bg-cyan-400/8 blur-xl"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              </>
            )}

            <AnimatePresence>
              {hovered === n.label && n.hint && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  className="absolute left-1/2 top-[115%] z-50 w-max max-w-[240px] -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-900/95 px-3 py-2 text-xs text-zinc-200 shadow-xl"
                >
                  {n.hint}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
