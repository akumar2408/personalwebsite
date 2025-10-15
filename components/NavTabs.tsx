"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Item = { id?: string; label: string; href?: string; hint?: string };

export default function NavTabs({ items }: { items: Item[] }) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  // In-page section active detection
  useEffect(() => {
    const ids = items.filter(i => i.id && !i.href).map(i => i.id!) ;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);

  const isRouteActive = (it: Item) => {
    if (it.href?.startsWith("/")) return pathname === it.href;
    if (it.id && !it.href) return active === it.id;
    return false;
  };

  return (
    <div className="relative flex gap-2 rounded-[14px] p-1 bg-zinc-900/60 border border-white/10">
      {items.map((n) => {
        const activeNow = isRouteActive(n);
        return (
          <div
            key={n.label}
            onMouseEnter={() => setHovered(n.label)}
            onMouseLeave={() => setHovered(null)}
            className="relative"
          >
            <a
              href={n.href ?? `#${n.id}`}
              className={[
                "px-3 py-1.5 rounded-[10px] text-sm transition",
                "hover:text-white/90 text-zinc-300",
                activeNow ? "font-medium" : ""
              ].join(" ")}
            >
              {n.label}
            </a>

            {activeNow && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-[10px] bg-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <AnimatePresence>
              {hovered === n.label && n.hint && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  className="absolute left-0 top-[110%] z-50 w-max max-w-[220px] rounded-[12px] border border-white/10 bg-zinc-900/95 px-3 py-2 text-xs text-zinc-200 shadow-xl"
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
