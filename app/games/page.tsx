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
  const [best, setBest] = useState(() => {
    if (typeof window === "undefined") return 0;
    const saved = window.localStorage.getItem("ak-best-wpm");
    return saved ? Number(saved) : 0;
  });
  const recorded = useRef(false);

  const target = PROMPTS[idx];

  useEffect(() => {
    setValue("");
    setDone(false);
    setStartedAt(null);
    recorded.current = false;
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
  const progress = Math.min((value.length / target.length) * 100, 100);

  const decorated = useMemo(() => {
    return target.split("").map((char, i) => {
      const typed = value[i];
      let className = "text-zinc-500";
      if (typed != null) {
        className = typed === char ? "text-emerald-300" : "text-rose-300";
      } else if (i === value.length) {
        className = "text-white";
      }
      return (
        <span key={`${char}-${i}`} className={className}>
          {char}
        </span>
      );
    });
  }, [target, value]);

  const coach = !startedAt
    ? "Tap the keyboard to start."
    : done
    ? "Nice sprint. Shake it out and run a new prompt."
    : wpm < 40
    ? "Warm-up pace — loosen up your shoulders."
    : wpm < 80
    ? "Dialed in. Keep the cadence steady."
    : "Flying. Focus on accuracy now.";

  useEffect(() => {
    if (done && !recorded.current && Number.isFinite(wpm)) {
      recorded.current = true;
      setBest((prev) => {
        const next = Math.max(prev, wpm);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("ak-best-wpm", String(next));
        }
        return next;
      });
    }
    if (!done) recorded.current = false;
  }, [done, wpm]);

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
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-sm text-zinc-300 mb-3 font-mono leading-relaxed break-words">
        {decorated}
      </div>
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
        <span className="rounded-full px-2 py-1 ring-1 ring-white/10">
          Best: <span className="font-medium">{best}</span>
        </span>
        <div className="ml-auto flex gap-2">
          <Btn onClick={() => setValue("")}>Reset</Btn>
          <Btn onClick={nextPrompt}>New prompt</Btn>
        </div>
      </div>
      <div className="mt-2 text-xs text-zinc-400">{coach}</div>
      {done && (
        <div className="mt-3 text-emerald-400 text-sm">
          Nice! You matched the prompt. Beat that best score?
        </div>
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
  const [lifelineUsed, setLifelineUsed] = useState(false);
  const [hidden, setHidden] = useState<number[]>([]);

  const q = TRIVIA[i];
  const progress = Math.round((i / TRIVIA.length) * 100);
  const answered = i + (showExplain ? 1 : 0);
  const confidence = answered ? Math.round((score / answered) * 100) : 0;

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
    setHidden([]);
  }

  function restart() {
    setI(0);
    setPick(null);
    setScore(0);
    setShowExplain(false);
    setLifelineUsed(false);
    setHidden([]);
  }

  const finished = i === TRIVIA.length - 1 && showExplain;

  function lifeline() {
    if (lifelineUsed || pick != null) return;
    setLifelineUsed(true);
    const wrong = q.choices
      .map((_, idx) => idx)
      .filter((idx) => idx !== q.answer);
    const removed = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
    setHidden(removed);
  }

  const tip = pick == null
    ? "Need help? Hit the 50/50 to drop two options."
    : pick === q.answer
    ? "Clean pick. Keep that streak going."
    : "Peek at the About and Now sections for clues.";

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
          if (hidden.includes(idx)) return null;
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

      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
        <span>Confidence: {confidence}%</span>
        <span className="ml-auto">{tip}</span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm rounded-full px-2 py-1 ring-1 ring-white/10">
          Score: <span className="font-semibold">{score}</span> / {TRIVIA.length}
        </span>
        <Btn onClick={lifeline} disabled={lifelineUsed || pick != null}>
          {lifelineUsed ? "50/50 used" : "50/50"}
        </Btn>
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

const TTT_LINES = [
  [0, 1, 2],[3, 4, 5],[6, 7, 8],
  [0, 3, 6],[1, 4, 7],[2, 5, 8],
  [0, 4, 8],[2, 4, 6],
] as const;

const findLineMove = (board: (null | "X" | "O")[], player: "X" | "O") => {
  for (const [a, b, c] of TTT_LINES) {
    const line = [a, b, c];
    const values = line.map((idx) => board[idx]);
    if (values.filter((v) => v === player).length === 2 && values.includes(null)) {
      return line[values.indexOf(null)];
    }
  }
  return null;
};

const pickBotMoveForBoard = (board: (null | "X" | "O")[]) => {
  return (
    findLineMove(board, "O") ??
    findLineMove(board, "X") ??
    (board[4] == null ? 4 : undefined) ??
    [0, 2, 6, 8].find((idx) => board[idx] == null) ??
    board.findIndex((cell) => cell == null)
  );
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
    } else if (match && found.includes(match)) {
      setHint(`Already logged ${match}. Try another.`);
    } else {
      setMiss((m) => [...m.slice(-4), input]);
      setHint("Nope — try another!");
    }
    setInput("");
  }

  const remaining = STACK.length - found.length;
  const done = remaining === 0;
  const completion = Math.round((found.length / STACK.length) * 100);
  const suggestions = useMemo(() => {
    if (!input.trim()) return [];
    const term = input.trim().toLowerCase();
    return STACK.filter(
      (item) =>
        item.toLowerCase().includes(term) &&
        !found.includes(item)
    ).slice(0, 4);
  }, [input, found]);

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
      {suggestions.length > 0 && (
        <div className="mt-2 text-xs text-zinc-500 flex flex-wrap items-center gap-1">
          Suggestions:
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setInput(s)}
              className="underline underline-offset-2 decoration-dotted"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 text-sm">
        <span className="rounded-full px-2 py-1 ring-1 ring-white/10">
          Found: <span className="font-medium">{found.length}</span> / {STACK.length}
        </span>
        <span className="ml-2 rounded-full px-2 py-1 ring-1 ring-white/10">
          Remaining: <span className="font-medium">{remaining}</span>
        </span>
      </div>

      <div className="mt-3 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400"
          style={{ width: `${completion}%` }}
        />
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
  const [mode, setMode] = useState<"solo" | "bot">("solo");

  const winner = useMemo(() => {
    for (const [a, b, c] of TTT_LINES) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) return cells[a];
    }
    return null;
  }, [cells]);

  const full = cells.every(Boolean);

  useEffect(() => {
    setCells(Array(9).fill(null));
    setXTurn(true);
  }, [mode]);

  useEffect(() => {
    if (mode !== "bot" || xTurn || winner || full) return;
    const t = setTimeout(() => {
      setCells((prev) => {
        if (prev.every(Boolean)) return prev;
        const next = [...prev];
        const move = pickBotMoveForBoard(next);
        if (move == null || move < 0) return prev;
        next[move] = "O";
        return next;
      });
      setXTurn(true);
    }, 450);
    return () => clearTimeout(t);
  }, [mode, xTurn, winner, full, cells]);

  function play(i: number) {
    if (cells[i] || winner) return;
    if (mode === "bot" && !xTurn) return;
    const copy = cells.slice();
    copy[i] = xTurn ? "X" : "O";
    setCells(copy);
    setXTurn(!xTurn);
  }

  function reset() {
    setCells(Array(9).fill(null));
    setXTurn(true);
  }

  const status = winner
    ? `Winner: ${winner}`
    : full
    ? "Draw!"
    : mode === "bot" && !xTurn
    ? "Site thinking…"
    : `Turn: ${xTurn ? "X" : "O"}`;

  return (
    <Card title="Tic-Tac-Toe" subtitle="First to three in a row wins.">
      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <Btn
          variant={mode === "solo" ? "primary" : "ghost"}
          onClick={() => setMode("solo")}
        >
          Pass & play
        </Btn>
        <Btn
          variant={mode === "bot" ? "primary" : "ghost"}
          onClick={() => setMode("bot")}
        >
          Play vs site
        </Btn>
      </div>
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
      <div className="mt-3 flex items-center gap-2 text-sm flex-wrap">
        <span className={winner ? "text-emerald-400" : full ? "text-cyan-400" : ""}>{status}</span>
        <Btn className="ml-auto" onClick={reset}>
          Reset
        </Btn>
      </div>
    </Card>
  );
}

/* ------------------------------
   5) Idea Mixer
------------------------------ */
const IDEA_ACTIONS = [
  "Prototype",
  "Automate",
  "Instrument",
  "De-risk",
  "Visualize",
  "Unify",
  "Stress test",
];
const IDEA_DOMAINS = [
  "claims triage queue",
  "policy admin backlog",
  "NetVR co-watch room",
  "founder CRM",
  "compliance reviews",
  "agent onboarding",
  "weekend hackathon",
];
const IDEA_TWISTS = [
  "with AI copilots as copilots",
  "with zero meetings",
  "in under 72 hours",
  "with real telemetry baked in",
  "using boring, proven stacks",
  "with a shared game-night vibe",
  "powered by Supabase + a tiny model",
];

function IdeaMixer() {
  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  const [action, setAction] = useState(() => pick(IDEA_ACTIONS));
  const [domain, setDomain] = useState(() => pick(IDEA_DOMAINS));
  const [twist, setTwist] = useState(() => pick(IDEA_TWISTS));
  const [locks, setLocks] = useState({ action: false, domain: false, twist: false });
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<NodeJS.Timeout | null>(null);

  const idea = `${action} the ${domain} ${twist}`;

  useEffect(() => {
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    };
  }, []);

  const shuffleSlot = (slot: keyof typeof locks) => {
    if (locks[slot]) return;
    if (slot === "action") setAction(pick(IDEA_ACTIONS));
    if (slot === "domain") setDomain(pick(IDEA_DOMAINS));
    if (slot === "twist") setTwist(pick(IDEA_TWISTS));
  };

  const shuffleUnlocked = () => {
    (Object.keys(locks) as (keyof typeof locks)[]).forEach((slot) => shuffleSlot(slot));
  };

  const copyIdea = () => {
    navigator.clipboard?.writeText(idea).catch(() => {});
    setCopied(true);
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopied(false), 1500);
  };

  const slots: { label: string; value: string; key: keyof typeof locks }[] = [
    { label: "Action", value: action, key: "action" },
    { label: "Focus", value: domain, key: "domain" },
    { label: "Twist", value: twist, key: "twist" },
  ];

  return (
    <Card title="Idea Mixer" subtitle="Blend prompts for the next mini build.">
      <div className="grid gap-3">
        {slots.map((slot) => (
          <div
            key={slot.key}
            className="rounded-[14px] ring-1 ring-white/10 bg-white/5 p-3"
          >
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-zinc-400">
              <span>{slot.label}</span>
              <button
                type="button"
                onClick={() =>
                  setLocks((prev) => ({ ...prev, [slot.key]: !prev[slot.key] }))
                }
                className={`text-xs ${locks[slot.key] ? "text-emerald-300" : "text-cyan-300"}`}
              >
                {locks[slot.key] ? "Locked" : "Lock"}
              </button>
            </div>
            <p className="mt-2 text-lg font-semibold text-zinc-100">{slot.value}</p>
            <button
              type="button"
              onClick={() => shuffleSlot(slot.key)}
              className="mt-2 text-xs text-zinc-400 underline underline-offset-2"
            >
              Shuffle {slot.label.toLowerCase()}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-zinc-300">{idea}.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Btn variant="primary" onClick={shuffleUnlocked}>Reroll unlocked</Btn>
        <Btn onClick={copyIdea}>Copy idea</Btn>
      </div>
      {copied && <div className="mt-1 text-xs text-emerald-400">Copied. Go build it.</div>}
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
          <p className="text-sm text-zinc-400">Mini breaks with a typing coach, trivia hints, stack guesses, and idea mashups.</p>
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
        <TypingTest />
        <GuessTheStack />
        <TriviaGame />
        <TicTacToe />
        <IdeaMixer />
      </div>

      <div className="mt-6 text-xs text-zinc-500">
        Tip: reload to shuffle typing prompts. Beat your best WPM or send me a new mini-game idea.
      </div>
    </main>
  );
}
