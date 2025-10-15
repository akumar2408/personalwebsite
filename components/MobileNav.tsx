"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Item = { id?: string; href: string; label: string };

export default function MobileNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Menu"
        className="rounded-[10px] px-3 py-2 border border-white/10 text-sm"
      >
        {open ? "Close" : "Menu"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 overflow-hidden rounded-[14px] border border-white/10 bg-zinc-900/80"
          >
            <ul className="p-2">
              {items.map((n) => (
                <li key={n.label}>
                  <Link
                    prefetch={false}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 rounded-[8px]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
