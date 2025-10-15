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

  // Only track sections when we're on the homepage
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") return;

    const ids = items.filter(i => i.id && i.href.startsWith("/#")).map(i => i.id!) ;
    if (!ids.length) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );

    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);

  const isRouteActive = (it: Item) => {
    // Section tabs: active only on home and when that section is intersecting
    if (it.id && it.href.startsWith("/#")) {
      return (pathname === "/" && activeId === it.id);
    }
    // Route tabs (e.g., /games)
    return pathname === it.href;
  };

  return (
    <div className="relative flex gap-3 rounded-[16px] p-2 bg-zinc-900/70 border border-white/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]">
      {items.map((n) => {
        const activeNow = isRouteActive(n);
        return (
          <div
            key={n.label}
            onMouseEnter={() => setHovered(n.label)}
            onMouseLeave={() => setHovered(null)}
            className="relative"
          >
            <Link
              prefetch={false}
              href={n.href}
              className={[
                "px-4 py-2 md:px-4 md:py-2.5 rounded-[12px] text-[15px] md:text-base transition",
                "hover:text-white/90 text-zinc-200",
                activeNow ? "font-semibold" : "font-medium",
              ].join(" ")}
              title={n.hint}
            >
              {n.label}
            </Link>

            {activeNow && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-[12px] bg-white/12 ring-1 ring-white/15 shadow-[0_8px_24px_-12px_rgba(56,189,248,0.45)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <AnimatePresence>
              {hovered === n.label && n.hint && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  className="absolute left-0 top-[110%] z-50 w-max max-w-[240px] rounded-[12px] border border-white/10 bg-zinc-900/95 px-3 py-2 text-xs text-zinc-200 shadow-xl"
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
