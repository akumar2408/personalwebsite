"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

type Item = { href: string; label: string; hint?: string };

export default function MobileNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <button
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
        className="rounded-[12px] px-3 py-2 border border-white/10"
      >
        <Menu className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-[14px] border border-white/10 bg-zinc-900/95 p-2">
          {items.map((it) => (
            <Link
              key={it.label}
              prefetch={false}
              href={it.href}
              onClick={() => setOpen(false)}
              className="block rounded-[10px] px-3 py-2 text-sm hover:bg-white/5"
            >
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
