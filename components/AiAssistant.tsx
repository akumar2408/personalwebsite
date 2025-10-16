"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { from: "user" | "bot"; text: string };

declare global {
  interface Window {
    speak?: (text: string) => void;
    sparkConfetti?: () => void;
  }
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Hey, I’m Aayush’s site. Ask me anything — try 'What’s he working on right now?'" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

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

      // voice reply
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(reply);
        utter.rate = 1.05;
        utter.pitch = 1.0;
        utter.lang = "en-US";
        window.speechSynthesis.speak(utter);
      }

      // fun confetti
      if (/nice|cool|awesome|great|good job|amazing/i.test(reply)) {
        import("canvas-confetti").then((confetti) => confetti.default());
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
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 bg-gradient-to-r from-cyan-500/80 via-fuchsia-500/70 to-purple-500/70 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-cyan-400/20 hover:scale-[1.02] transition-all backdrop-blur"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">Ask my site</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="fixed bottom-6 right-6 z-[95] w-[340px] sm:w-[380px] rounded-[20px] border border-white/10 bg-zinc-900/95 text-zinc-100 shadow-2xl backdrop-blur-lg overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-purple-500/10">
              <span className="font-semibold text-sm">AI Assistant</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-[80%] ${
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
                sendMessage();
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
