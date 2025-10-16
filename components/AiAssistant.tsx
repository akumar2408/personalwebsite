"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mic, MicOff } from "lucide-react";

type Msg = { from: "user" | "bot"; text: string };

type AiAssistantProps = {
  /** If provided, controls when the FAB can appear. Useful: visible={splashDone} */
  visible?: boolean;
  /** Delay (ms) after visible goes true before showing the FAB */
  appearDelayMs?: number;
};

export default function AiAssistant({
  visible,
  appearDelayMs = 600,
}: AiAssistantProps) {
  // UI state
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false); // when true, show the FAB
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState(() => {
    if (typeof window === "undefined") return false;
    const v = localStorage.getItem("ai-voice");
    return v ? v === "on" : false;
  });

  // Chat state
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text:
        "Hey, I’m Aayush’s site. Ask me anything — try 'What’s he working on right now?'",
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  /* ---------- Control “ready” (when the FAB shows) ---------- */
  useEffect(() => {
    // If parent passes 'visible', use that as the source of truth
    if (typeof visible === "boolean") {
      if (visible) {
        const t = setTimeout(() => setReady(true), appearDelayMs);
        return () => clearTimeout(t);
      } else {
        setReady(false);
      }
      return;
    }

    // Otherwise, auto-detect a splash element
    const splash =
      document.getElementById("splash") ||
      document.getElementById("splash-intro");

    if (!splash) {
      setReady(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        // show FAB when splash is mostly gone
        setReady(!e.isIntersecting || e.intersectionRatio < 0.2);
      },
      { threshold: [0, 0.2, 1] }
    );
    io.observe(splash);

    // Fallback + optional custom event for reliability
    const fallback = setTimeout(() => setReady(true), 6000);
    const done = () => setReady(true);
    window.addEventListener("splash:done", done);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
      window.removeEventListener("splash:done", done);
    };
  }, [visible, appearDelayMs]);

  /* ---------- Lock page scroll while panel is open ---------- */
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  /* ---------- Auto-scroll messages to bottom ---------- */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  /* ---------- Persist voice toggle ---------- */
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ai-voice", voice ? "on" : "off");
    }
  }, [voice]);

  async function sendMessage() {
    if (!input.trim()) return;
    const newMsg: Msg = { from: "user", text: input.trim() };
    setMsgs((m) => [...m, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMsg.text }),
      });

      const data = await res.json();
      const reply = data.reply || "Hmm, I’m not sure about that right now.";
      setMsgs((m) => [...m, { from: "bot", text: reply }]);

      // Voice reply (only if toggled on)
      if (voice && typeof window !== "undefined" && "speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(reply);
        utter.rate = 1.05;
        utter.pitch = 1.0;
        utter.lang = "en-US";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      }

      // Fun confetti on compliments
      if (/nice|cool|awesome|great|good job|amazing/i.test(reply)) {
        import("canvas-confetti").then((c) => c.default());
      }
    } catch (err) {
      console.error(err);
      setMsgs((m) => [
        ...m,
        { from: "bot", text: "Something went wrong — probably me again 😅" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating Button (only after splash is gone / visible=true) */}
      <AnimatePresence>
        {!open && ready && (
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 bg-gradient-to-r from-cyan-500/80 via-fuchsia-500/70 to-purple-500/70 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-cyan-400/20 hover:scale-[1.02] transition-all backdrop-blur"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">Ask my site</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop (click to minimize) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="ai-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[94] bg-black"
          />
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="ai-panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="fixed bottom-6 right-6 z-[95] w-[360px] sm:w-[400px] h-[520px] sm:h-[560px] rounded-[20px] border border-white/10 bg-zinc-900/95 text-zinc-100 shadow-2xl backdrop-blur-lg flex flex-col"
            // Stop scroll events from affecting the page
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-purple-500/10">
              <span className="font-semibold text-sm">AI Assistant</span>

              <div className="flex items-center gap-1.5">
                {/* Voice toggle */}
                <button
                  aria-label="Toggle voice replies"
                  onClick={() => setVoice((v) => !v)}
                  title={voice ? "Voice replies: on" : "Voice replies: off"}
                  className={[
                    "rounded-full p-1.5 ring-1 transition",
                    voice
                      ? "ring-emerald-400/40 bg-emerald-900/20"
                      : "ring-white/10 hover:bg-white/10",
                  ].join(" ")}
                >
                  {voice ? (
                    <Mic className="h-4 w-4 text-emerald-300" />
                  ) : (
                    <MicOff className="h-4 w-4 text-zinc-300" />
                  )}
                </button>

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="rounded-full p-1.5 hover:bg-white/10 ring-1 ring-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages – fixed area with its own scroll */}
            <div
              ref={messagesRef}
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-3"
            >
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`max-w-[82%] ${
                    m.from === "user"
                      ? "ml-auto bg-cyan-500/10 border border-cyan-400/20 rounded-l-xl rounded-tr-xl"
                      : "mr-auto bg-white/5 border border-white/10 rounded-r-xl rounded-tl-xl"
                  } px-3 py-2 text-sm leading-relaxed`}
                >
                  {m.text}
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!loading) sendMessage();
              }}
              className="flex items-center gap-2 border-t border-white/10 px-3 py-2 bg-zinc-950/40"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask me anything…"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-full p-2 hover:bg-white/10 disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4 text-zinc-300" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
