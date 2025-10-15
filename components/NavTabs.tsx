"use client";

import Link from "next/link";

type Item = { href: string; label: string; hint?: string };

export default function NavTabs({ items }: { items: Item[] }) {
  return (
    <ul className="flex items-center gap-2">
      {items.map((it) => (
        <li key={it.label}>
          <Link
            prefetch={false}
            href={it.href}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm
                       ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5"
            title={it.hint}
          >
            {it.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
