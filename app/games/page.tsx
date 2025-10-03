// app/games/page.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";

export default function Games() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Games</h1>
        <Link href="/" className="text-sm opacity-80 hover:underline">← Back home</Link>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card title="Tic-Tac-Toe">
          <TicTacToe />
        </Card>

        <Card title="Typing Test">
          <TypingTest />
        </Card>
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
      <h2 className="font-medium">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/* ---------- Tic-Tac-Toe ---------- */
function TicTacToe() {
  const [board, setBoard] = useState<(null | "X" | "O")[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");

  const winner = useMemo(() => {
    const lines = [
      [0, 1, 2],[3, 4, 5],[6, 7, 8],
      [0, 3, 6],[1, 4, 7],[2, 5, 8],
      [0, 4, 8],[2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return null;
  }, [board]);

  const draw = !winner && board.every(Boolean);

  function play(i: number) {
    if (board[i] || winner) return;
    const next = [...board];
    next[i] = turn;
    setBoard(next);
    setTurn(turn === "X" ? "O" : "X");
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setTurn("X");
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((v, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            className="h-16 rounded-xl bg-black/30 border border-white/10 text-xl font-semibold"
          >
            {v ?? ""}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm">
        {winner ? `Winner: ${winner}` : draw ? "Draw!" : `Turn: ${turn}`}
      </p>
      <button onClick={reset} className="mt-2 rounded-lg border border-white/10 px-3 py-1 text-sm">
        Reset
      </button>
    </div>
  );
}

/* ---------- Typing Test ---------- */
const prompts = [
  "Ship a small slice and improve it.",
  "Clean inputs and clear outputs win most days.",
  "Logs save hours when things break.",
  "Simple tools beat clever ones you cannot trust.",
];

function TypingTest() {
  const [target, setTarget] = useState(prompts[0]);
  const [text, setText] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);

  useEffect(() => {
    if (text.length === 1 && !start) setStart(Date.now());
    if (text === target && start) {
      const minutes = (Date.now() - start) / 60000;
      const words = target.trim().split(/\s+/).length;
      setWpm(Math.round(words / minutes));
    } else {
      setWpm(null);
    }
  }, [text, target, start]);

  function reset() {
    setTarget(prompts[Math.floor(Math.random() * prompts.length)]);
    setText("");
    setStart(null);
    setWpm(null);
  }

  return (
    <div>
      <p className="text-sm text-zinc-300">{target}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 p-3 text-sm outline-none"
        placeholder="Type here…"
      />
      <div className="mt-2 flex items-center gap-3">
        <span className="text-sm">{wpm ? `WPM: ${wpm}` : "Start typing to begin"}</span>
        <button onClick={reset} className="rounded-lg border border-white/10 px-3 py-1 text-sm">
          New prompt
        </button>
      </div>
    </div>
  );
}
