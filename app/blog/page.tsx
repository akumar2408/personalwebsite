import React from "react";
import Link from "next/link";

const posts = [
  {
    slug: "what-i-actually-do-when-i-build-ai",
    title: "What I actually do when I build AI stuff",
    date: "Oct 2025",
    summary:
      "I start small, ship a tiny end-to-end loop, and only add the fancy pieces after it’s useful.",
  },
  {
    slug: "my-quick-checklist-before-i-ship",
    title: "My quick checklist before I ship",
    date: "Oct 2025",
    summary:
      "A short list I run through before I push: clear readme, good defaults, basic tests, simple logging, and a way to roll back fast.",
  },
  {
    slug: "one-bug-a-day",
    title: "One bug a day",
    date: "May 2025",
    summary:
      "Fixing one small bug each day taught me more than any tutorial. It also made the app feel calmer.",
  },
  {
    slug: "the-day-i-deleted-half-the-code",
    title: "The day I deleted half the code",
    date: "Dec 2024",
    summary:
      "We kept what people used and tossed the rest. The app got faster, and so did the team.",
  },
];

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      <p className="opacity-70 mt-2">Personal notes on building and shipping.</p>
      <div className="mt-6 space-y-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block rounded-[20px] border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
          >
            <p className="text-xs text-zinc-400">{p.date}</p>
            <h2 className="font-medium mt-1">{p.title}</h2>
            <p className="text-sm text-zinc-300 mt-1">{p.summary}</p>
            <span className="text-sm underline mt-2 inline-block">Read more</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
