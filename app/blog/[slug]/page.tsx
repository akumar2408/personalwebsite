import React from "react"; // value import so TS treats this as a module
import type { Metadata } from "next";
import Link from "next/link";

type Post = { title: string; date: string; body: React.ReactNode };

const posts: Record<string, Post> = {
  "what-i-actually-do-when-i-build-ai": {
    title: "What I actually do when I build AI stuff",
    date: "Oct 2025",
    body: (
      <div className="space-y-5 text-zinc-300 leading-relaxed">
        <p>
          When I build something with AI, I try to ignore the fancy parts at
          first. I pick one simple path a person should complete, wire that path
          end to end, and make sure it feels good. If it’s clunky, I fix the
          basics before I add anything else.
        </p>
        <p>
          I like plain data in and plain data out. I write a small contract for
          what I expect. If a rule is enough, I use a rule. I only add a model
          when it clearly helps the person using it.
        </p>
        <p>
          Logs matter. A short line that says “got this input, called this, sent
          this back” saves hours. I deploy early with a simple rollback. The
          goal isn’t perfect scores; it’s a tool people can use and trust.
        </p>
        <p>Ship a slice. Watch it. Fix it. Repeat.</p>
      </div>
    ),
  },
  "my-quick-checklist-before-i-ship": {
    title: "My quick checklist before I ship",
    date: "Oct 2025",
    body: (
      <div className="space-y-5 text-zinc-300 leading-relaxed">
        <p>Before I share a link, I walk through the same short checklist.</p>
        <p>
          <strong>README:</strong> one-line install, one-line run, one clear
          goal. <strong>Defaults:</strong> sample env, seed data, and a local
          script. <strong>Tests:</strong> main path plus one edge.{" "}
          <strong>Logs:</strong> a few lines that tell me what broke.{" "}
          <strong>Rollback:</strong> even if it’s just “revert and redeploy”.
        </p>
        <p>It isn’t fancy. It just makes the link feel solid.</p>
      </div>
    ),
  },
  "one-bug-a-day": {
    title: "One bug a day",
    date: "May 2025",
    body: (
      <div className="space-y-5 text-zinc-300 leading-relaxed">
        <p>
          I started fixing one bug a day. Small ones. A typo in a label. A
          button that jumped a little. A slow query with an easy index. It felt
          too simple at first, then it changed how I work.
        </p>
        <p>
          Each bug forced me to read the code others skip. I learned where the
          logs were thin, where a function did two jobs, and where names didn’t
          match what they did. The fixes were quick. The lessons stuck.
        </p>
        <p>
          After a week, the app felt calmer. Pages loaded a bit faster. Fewer
          people got stuck. The team moved smoother because friction was lower.
          The best part: I didn’t need a big plan. I just needed a habit.
        </p>
        <p>
          It’s not heroic work. It’s honest work. One bug a day is enough to
          nudge a project in the right direction and keep it there.
        </p>
      </div>
    ),
  },
  "the-day-i-deleted-half-the-code": {
    title: "The day I deleted half the code",
    date: "Dec 2024",
    body: (
      <div className="space-y-5 text-zinc-300 leading-relaxed">
        <p>
          We had features no one used and helpers that wrapped other helpers.
          Shipping felt heavy. So we did something simple: we listed what people
          actually needed, kept that, and deleted the rest.
        </p>
        <p>
          The app got smaller. Tests ran faster. New ideas were easier to try.
          We didn’t lose power; we lost drag. The code we kept was clearer, and
          the stories were shorter because the path was short.
        </p>
        <p>
          Deleting code feels scary the first time. Then you see the build run
          in half the time and you sleep better. We didn’t get clever. We got
          brave about what mattered.
        </p>
        <p>
          I like that kind of work. It makes room for the things that deserve
          time.
        </p>
      </div>
    ),
  },
};

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = posts[params.slug];
  return { title: post ? post.title : "Blog" };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="text-zinc-300">Not found.</p>
        <Link href="/#blog" className="text-sm opacity-80 underline">
          ← Back
        </Link>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/#blog" className="text-sm opacity-80 hover:underline">
        ← Back
      </Link>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="text-sm text-zinc-400 mt-1">{post.date}</p>
      <article className="mt-6">{post.body}</article>
    </main>
  );
}
