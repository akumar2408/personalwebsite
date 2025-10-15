"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------
   Shared bits
------------------------------ */
function Card({
  title,
  children,
  className = "",
  subtitle,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[20px] ring-1 ring-white/10 bg-white/[0.05] p-4 md:p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] ${className}`}
    >
      <div className="mb-3">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

const Btn = ({
  children,
  onClick,
  disabled,
  variant = "ghost",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "ghost" | "primary";
  className?: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={[
      "rounded-[12px] px-3 py-2 text-sm transition",
      variant === "primary"
        ? "bg-white/10 hover:bg-white/15 ring-1 ring-white/20"
        : "ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5",
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      className,
    ].join(" ")}
  >
    {children}
  </button>
);

/* ------------------------------
   1) Typing Test
------------------------------ */
const PROMPTS = [
  "Ship a tiny slice end-to-end. Polish after it's useful.",
  "Make boring ETL on purpose: clear logs, predictable data, no 2am pages.",
  "Small AI tools beat giant demos. Embed, retrieve, act.",
  "Readable code > clever code. Future you is on your team.",
  "Postgres first. Add Redshift when you actually need it.",
  "Glue less, design more. Fewer moving parts, fewer bugs.",
  "Fast feedback loops win. Feature flags, preview deploys, short PRs.",
  "If it's not logged, it never happened. If it's not monitored, it never existed.",
];

function TypingTest() {
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const target = PROMPTS[idx];

  useEffect(() => {
    setValue("");
    setDone(false);
    setStartedAt(null);
  }, [idx]);

  const correct = useMemo(() => {
    let ok = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === target[i]) ok++;
    }
    return ok;
  }, [value, target]);

  const accuracy = value.length ? Math.round((correct / value.length) * 100) : 100;
  const elapsedMin =
    startedAt == null ? 0 : Math.max((Date.now() - startedAt) / 1000 / 60, 1 / 60);
  const wpm = Math.max(0, Math.round(correct / 5 / elapsedMin));

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!startedAt) setStartedAt(Date.now());
    const v = e.target.value;
    setValue(v);
    if (v === target) setDone(true);
  }

  function nextPrompt() {
    setIdx((i) => (i + 1) % PROMPTS.length);
  }

  return (
    <Card title="Typing Test" subtitle="Ship a small slice and improve it.">
      <div className="text-sm text-zinc-300 mb-3">{target}</div>
      <textarea
        rows={5}
        value={value}
        onChange={onChange}
        className="w-full rounded-[12px] bg-black/40 ring-1 ring-white/10 px-3 py-2 outline-none"
        placeholder="Start typing…"
      />
      <div className="mt-3 flex items-center gap-3 text-sm">
        <span className="rounded-full px-2 py-1 ring-1 ring-white/10">
          WPM: <span className="font-medium">{Number.isFinite(wpm) ? wpm : 0}</span>
        </span>
        <span className="rounded-full px-2 py-1 ring-1 ring-white/10">
          Accuracy: <span className="font-medium">{accuracy}%</span>
        </span>
        <div className="ml-auto flex gap-2">
          <Btn onClick={() => setValue("")}>Reset</Btn>
          <Btn onClick={nextPrompt}>New prompt</Btn>
        </div>
      </div>
      {done && (
        <div className="mt-3 text-emerald-400 text-sm">Nice! You nailed it. Try another prompt.</div>
      )}
    </Card>
  );
}

/* ------------------------------
   2) Aayush Trivia (enhanced)
------------------------------ */
type Q = { question: string; choices: string[]; answer: number; explain?: string };

const TRIVIA: Q[] = [
  { question: "Where is Aayush based?",
    choices: ["Phoenix • Los Angeles", "Boston • NYC", "Seattle • Austin", "Tempe • San Diego"],
    answer: 0, explain: "Shown in the hero chip." },
  { question: "Favorite build style?",
    choices: ["Massive monolith first","Small end-to-end slice, then polish","Microservices immediately","Only front-end demos"],
    answer: 1, explain: "You say this across the site." },
  { question: "Current study path?",
    choices: ["BFA – Graphic Design","BS CS & MCS Big Data Systems (accelerated)","MBA – Finance","Physics & Math"],
    answer: 1 },
  { question: "AI approach you prototype a lot?",
    choices: ["GANs","RAG + Embeddings","Transformers from scratch","AutoML only"], answer: 1 },
  { question: "Go-to starter database?",
    choices: ["MongoDB","DynamoDB","PostgreSQL","Cassandra"], answer: 2 },
  { question: "Cloud/tooling combo you’ve used?",
    choices: ["Azure + Cosmos + Logic Apps","AWS + Kinesis + Glue + Redshift","GCP + Spanner + Bigtable","On-prem Hadoop"],
    answer: 1 },
  { question: "Student investing helper project?",
    choices: ["Operational Dashboard","AIInvestMate","SafetyGuardian","StockPay Insights"], answer: 1 },
  { question: "What do you value more than scope?",
    choices: ["Velocity","Polish","Headcount","Revenue"], answer: 1 },
  { question: "CI/CD mindset?",
    choices: ["YOLO to prod","Only manual deploys","Feature flags + short PRs + preview deploys","Monthly scheduled deploys"],
    answer: 2 },
  { question: "Logging/observability stance?",
    choices: ["Only print statements","Log everything, no dashboards","If it's not logged & monitored, it doesn't exist","Rely on user reports"],
    answer: 2 },
  { question: "Frontend framework you use a lot?",
    choices: ["Svelte","React/Next.js","Vue","Ember"], answer: 1 },
  { question: "A tiny fun tab on your site?",
    choices: ["Music","Games","Gallery","Shop"], answer: 1 },
];

function TriviaGame() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplain, setShowExplain] = useState(false);

  const q = TRIVIA[i];
  const progress = Math.round((i / TRIVIA.length) * 100);

  function choose(c: number) {
    if (pick != null) return;
    setPick(c);
    if (c === q.answer) setScore((s) => s + 1);
    setShowExplain(true);
  }

  function next() {
    setPick(null);
    setShowExplain(false);
    setI((n) => (n + 1 < TRIVIA.length ? n + 1 : n));
  }

  function restart() {
    setI(0);
    setPick(null);
    setScore(0);
    setShowExplain(false);
  }

  const finished = i === TRIVIA.length - 1 && showExplain;

  return (
    <Card title="Aayush Trivia" subtitle="How well do you know me?">
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400"
          style={{ width: `${finished ? 100 : progress}%` }}
        />
      </div>

      <div className="text-sm text-zinc-300 mb-3">{q.question}</div>
      <div className="grid gap-2">
        {q.choices.map((c, idx) => {
          const isPick = pick === idx;
          const isCorrect = pick != null && idx === q.answer;
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              className={[
                "text-left rounded-[12px] px-3 py-2 ring-1 transition",
                pick == null
                  ? "ring-white/10 hover:ring-white/20 hover:bg-white/5"
                  : isCorrect
                  ? "ring-emerald-300/40 bg-emerald-900/10"
                  : isPick
                  ? "ring-rose-300/40 bg-rose-900/10"
                  : "ring-white/10 opacity-60",
              ].join(" ")}
            >
              {c}
            </button>
          );
        })}
      </div>

      {showExplain && (
        <div className="mt-3 text-xs text-zinc-400">
          {q.explain ?? `Answer: ${q.choices[q.answer]}`}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm rounded-full px-2 py-1 ring-1 ring-white/10">
          Score: <span className="font-semibold">{score}</span> / {TRIVIA.length}
        </span>
        <div className="ml-auto flex gap-2">
          {!finished && <Btn onClick={next} disabled={pick == null}>Next</Btn>}
          {finished && (
            <>
              <span className="text-emerald-400 text-sm">Nice run!</span>
              <Btn onClick={restart}>Play again</Btn>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------
   3) Guess the Stack
------------------------------ */
const STACK = [
  "Python","TypeScript","JavaScript","SQL","Go","C#",
  "React","Next.js","Django","FastAPI","Spring Boot","React Native","Tailwind",
  "AWS","Vercel","Supabase","Azure",
  "PostgreSQL","Redshift",
  "Docker","Terraform","GitHub Actions",
  "Kinesis","Glue",
];

const HINTS: Record<string, string> = {
  "Next.js": "Meta-framework on top of React.",
  FastAPI: "Lightning-fast Python APIs.",
  "Spring Boot": "Java framework that just runs.",
  Redshift: "Columnar warehouse from AWS.",
  Kinesis: "AWS stream firehose.",
  Glue: "Serverless ETL from AWS.",
};

function GuessTheStack() {
  const [input, setInput] = useState("");
  const [found, setFound] = useState<string[]>([]);
  const [miss, setMiss] = useState<string[]>([]);
  const [hint, setHint] = useState<string>("Type a tech and press Enter.");

  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = normalize(input);
    if (!n) return;
    const match = STACK.find((t) => normalize(t) === n);
    if (match && !found.includes(match)) {
      setFound((f) => [...f, match]);
      setHint(HINTS[match] ? `✅ ${match}: ${HINTS[match]}` : `✅ ${match}`);
    } else {
      setMiss((m) => [...m.slice(-4), input]);
      setHint("Nope — try another!");
    }
    setInput("");
  }

  const remaining = STACK.length - found.length;
  const done = remaining === 0;

  return (
    <Card title="Guess the Stack" subtitle="Name as many tools in Aayush’s stack as you can.">
      <form onSubmit={submit} className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., Next.js"
          className="flex-1 rounded-[12px] bg-black/40 ring-1 ring-white/10 px-3 py-2 outline-none"
        />
        <Btn variant="primary">Add</Btn>
      </form>

      <div className="mt-2 text-xs text-zinc-400">{hint}</div>

      <div className="mt-3 text-sm">
        <span className="rounded-full px-2 py-1 ring-1 ring-white/10">
          Found: <span className="font-medium">{found.length}</span> / {STACK.length}
        </span>
        <span className="ml-2 rounded-full px-2 py-1 ring-1 ring-white/10">
          Remaining: <span className="font-medium">{remaining}</span>
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {STACK.map((t) => (
          <span
            key={t}
            className={[
              "text-xs px-2 py-1 rounded-full ring-1",
              found.includes(t)
                ? "ring-emerald-300/40 bg-emerald-900/10"
                : "ring-white/10 bg-white/5 opacity-60",
            ].join(" ")}
          >
            {t}
          </span>
        ))}
      </div>

      {miss.length > 0 && (
        <div className="mt-3 text-xs text-zinc-400">Misses: {miss.slice(-5).join(", ")}</div>
      )}

      {done && (
        <div className="mt-3 text-emerald-400 text-sm">
          You named them all. Hire this person already. 🎉
        </div>
      )}
    </Card>
  );
}

/* ------------------------------
   4) Tic-Tac-Toe
------------------------------ */
function TicTacToe() {
  const [cells, setCells] = useState<(null | "X" | "O")[]>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);

  const lines = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6],
  ];

  const winner = useMemo(() => {
    for (const [a, b, c] of lines) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) return cells[a];
    }
    return null;
  }, [cells]);

  const full = cells.every(Boolean);

  function play(i: number) {
    if (cells[i] || winner) return;
    const copy = cells.slice();
    copy[i] = xTurn ? "X" : "O";
    setCells(copy);
    setXTurn(!xTurn);
  }

  function reset() {
    setCells(Array(9).fill(null));
    setXTurn(true);
  }

  return (
    <Card title="Tic-Tac-Toe" subtitle="First to three in a row wins.">
      <div className="grid grid-cols-3 gap-2 w-[240px] sm:w-[260px]">
        {cells.map((v, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            className="h-20 sm:h-24 rounded-[12px] bg-black/40 ring-1 ring-white/10 text-xl sm:text-2xl font-semibold hover:ring-white/20"
          >
            {v}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm">
        {!winner && !full && (
          <span>
            Turn: <b>{xTurn ? "X" : "O"}</b>
          </span>
        )}
        {winner && <span className="text-emerald-400">Winner: {winner}</span>}
        {!winner && full && <span className="text-cyan-400">Draw!</span>}
        <Btn className="ml-auto" onClick={reset}>
          Reset
        </Btn>
      </div>
    </Card>
  );
}

/* ------------------------------
   Page
------------------------------ */
export default function GamesPage() {
  // Header is rendered from app/layout.tsx so it already works on every route.
  // We keep the page content below it and provide a Back home button here.
  return (
    <main className="relative z-0 mx-auto max-w-6xl px-4 pt-10 pb-16">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Games</h1>
          <p className="text-sm text-zinc-400">Little breaks that still feel like me.</p>
        </div>

        {/* Back home button */}
        <Link
          href="/"
          prefetch={false}
          className="text-sm rounded-full px-3 py-1.5 ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5"
          aria-label="Back home"
        >
          ← Back home
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <TicTacToe />
        <TypingTest />
        <TriviaGame />
        <GuessTheStack />
      </div>

      <div className="mt-6 text-xs text-zinc-500">
        Tip: reload to shuffle typing prompts. Have an idea for a new mini-game? Ping me.
      </div>
    </main>
  );
}
