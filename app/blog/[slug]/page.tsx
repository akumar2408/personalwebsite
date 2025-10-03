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
          first. I pick one simple path a person should be able to complete,
          wire that path end to end, and get it working. That usually means a
          small input, a short call to a service, and a clear result. If that
          loop feels good, I keep going. If it feels clunky, I fix the basics
          before I add anything else.
        </p>
        <p>
          I like plain data in and plain data out. I write a quick contract for
          what I expect from the model. If a rule or a small function is enough,
          I use that instead. It’s faster to ship and easier to reason about,
          and I can swap in a model later if it’s worth it.
        </p>
        <p>
          Once the core loop is real, I add the “quality of life” pieces:
          loading states, simple error messages, and logs that tell me what
          happened. Logs save me hours. If I can read a short line that says
          “got this input, called this thing, returned this answer,” I can fix
          issues without guessing.
        </p>
        <p>
          I try to keep prompts short and direct. If I need structure, I ask for
          it. If I need speed, I start with a smaller model. I only add extra
          steps (reranking, tools, agents) when the baseline is too weak and I
          can prove the extra hop helps real users.
        </p>
        <p>
          I deploy early, even if it’s rough. A boring deploy that I can roll
          back is better than a clever one that scares me. The goal isn’t to
          chase a perfect score; it’s to make something people can use and
          improve it with real feedback.
        </p>
        <p>
          That’s the rhythm I trust: ship a small slice, watch it, fix it, and
          repeat. Most wins come from clear inputs, solid defaults, and simple
          code that stays up.
        </p>
      </div>
    ),
  },
  "my-quick-checklist-before-i-ship": {
    title: "My quick checklist before I ship",
    date: "Oct 2025",
    body: (
      <div className="space-y-5 text-zinc-300 leading-relaxed">
        <p>
          Before I share a link, I walk through the same short checklist. It
          keeps me honest and stops me from rushing past the basics.
        </p>
        <p>
          <strong>1) A clean README.</strong> Someone new should be able to run
          the project with one command. I include a short note on the goal,
          setup steps, and how to see something real on screen.
        </p>
        <p>
          <strong>2) Good defaults.</strong> I add a sample env file, a tiny
          seed script, and safe defaults for local runs. If it takes ten minutes
          to get a clean run, I’ll lose people. If it takes one minute, I’ll get
          useful feedback.
        </p>
        <p>
          <strong>3) Basic tests.</strong> I test the main path and one edge
          case. These tests are simple on purpose. They guard against the “oops,
          I broke the thing we demo” problem.
        </p>
        <p>
          <strong>4) Simple logging.</strong> I log inputs at the edges and a
          few key decisions. When something breaks, I want to read one or two
          lines and know what to try next.
        </p>
        <p>
          <strong>5) A rollback plan.</strong> Even if the plan is just “revert
          and redeploy,” I write it down. Knowing I can go back makes me ship
          faster.
        </p>
        <p>
          None of this is fancy. It’s just the small habits that make a link
          feel trustworthy. People don’t need perfection; they need something
          they can open, try, and understand.
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
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {post.title}
      </h1>
      <p className="text-sm text-zinc-400 mt-1">{post.date}</p>
      <article className="mt-6">{post.body}</article>
    </main>
  );
}
