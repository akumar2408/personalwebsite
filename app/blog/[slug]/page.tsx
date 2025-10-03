import React from "react";                      // value import so TS sees a module
import type { Metadata } from "next";
import Link from "next/link";

const posts: Record<string, { title: string; date: string; body: React.ReactNode }> = {
  "what-i-actually-do-when-i-build-ai": {
    title: "What I actually do when I build AI stuff",
    date: "Oct 2025",
    body: (
      <div className="space-y-4 text-zinc-300 leading-relaxed">
        <p>I don’t start with a big plan. I pick one thing a person should be able to do, wire it end to end, and get that working.</p>
        <p>Then I clean it up: better prompts when needed, smaller models when possible, or a simple rule if that’s enough. I add logs so prod is easy to understand.</p>
        <p>Clean inputs and outputs win most days. A boring deploy I can roll back beats a clever one I can’t trust. Ship a slice, learn, repeat.</p>
      </div>
    ),
  },
  "my-quick-checklist-before-i-ship": {
    title: "My quick checklist before I ship",
    date: "Oct 2025",
    body: (
      <div className="space-y-4 text-zinc-300 leading-relaxed">
        <ul className="list-disc ml-5 space-y-2">
          <li>README with a one-line install and one-line run.</li>
          <li>Good defaults: sample env, seed data, local script.</li>
          <li>Basic tests for the main path and one edge case.</li>
          <li>Simple logging so I can tell what broke and where.</li>
          <li>A rollback plan, even if it’s just “revert and redeploy”.</li>
        </ul>
        <p>Nothing fancy. Just enough to be calm when I share the link.</p>
      </div>
    ),
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts[params.slug];
  return { title: post ? post.title : "Blog" };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="text-zinc-300">Not found.</p>
        <Link href="/#blog" className="text-sm opacity-80 underline">← Back</Link>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/#blog" className="text-sm opacity-80 hover:underline">← Back</Link>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="text-sm text-zinc-400 mt-1">{post.date}</p>
      <article className="mt-6">{post.body}</article>
    </main>
  );
}
