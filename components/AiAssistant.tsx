"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Volume2, VolumeX } from "lucide-react";

type Msg = { from: "user" | "bot"; text: string };

type Props = {
  /** Flip this to true after your splash finishes */
  visible?: boolean;
  /** Delay before the floating button appears once visible === true */
  appearDelayMs?: number;
};

export default function AiAssistant({ visible = true, appearDelayMs = 800 }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text:
        "Hey, I’m Aayush’s site. Ask me anything — try 'What’s he working on right now?'",
    },
  ]);
  const [input, setInput] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [buttonReady, setButtonReady] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Show the floating button with a small delay after visible=true
  useEffect(() => {
    if (!visible) {
      setButtonReady(false);
      return;
    }
    const t = setTimeout(() => setButtonReady(true), appearDelayMs);
    return () => clearTimeout(t);
  }, [visible, appearDelayMs]);

  // Scroll to bottom when messages update
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock page scroll while chat is open; allow scrolling only inside chat
  useEffect(() => {
    if (open) {
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
      };
    }
  }, [open]);

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

      // Only speak if the toggle is on
      if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(reply);
        utter.rate = 1.05;
        utter.pitch = 1;
        utter.lang = "en-US";
        window.speechSynthesis.speak(utter);
      }

      // confetti for nice replies
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
      {/* Floating Button */}
      <AnimatePresence>
        {visible && buttonReady && !open && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 bg-gradient-to-r from-cyan-500/80 via-fuchsia-500/70 to-purple-500/70 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-cyan-400/20 hover:scale-[1.02] transition-all backdrop-blur"
            aria-label="Open AI Assistant"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">Ask my site</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop + Chat */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop: click to close */}
            <motion.div
              className="fixed inset-0 z-[94] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Chat Box (scroll-trapped) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="fixed bottom-6 right-6 z-[95] w-[340px] sm:w-[380px] rounded-[20px] border border-white/10 bg-zinc-900/95 text-zinc-100 shadow-2xl backdrop-blur-lg overflow-hidden flex flex-col overscroll-contain"
              // stop backdrop from closing when clicking inside the panel
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-purple-500/10">
                <span className="font-semibold text-sm">AI Assistant</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVoiceEnabled((v) => !v)}
                    className="p-1 rounded-full hover:bg-white/10"
                    title={voiceEnabled ? "Disable voice" : "Enable voice"}
                    aria-label={voiceEnabled ? "Disable voice" : "Enable voice"}
                  >
                    {voiceEnabled ? (
                      <Volume2 className="h-4 w-4 text-cyan-400" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-zinc-400" />
                    )}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full p-1 hover:bg-white/10"
                    aria-label="Close assistant"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages (only this area scrolls) */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 overscroll-contain">
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
                  aria-label="Type your message"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full p-2 hover:bg-white/10 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 text-zinc-300" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
