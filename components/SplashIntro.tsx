'use client';
import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashIntro({ onDone }: { onDone: () => void }) {
  // Total length of sequence (dash draw + letters + exit)
  const TOTAL_MS = 3600;

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mq?.matches) {
      onDone(); // no animation for rm users
      return;
    }
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(onDone, TOTAL_MS);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = prev;
    };
  }, [onDone]);

  const NAME = 'Aayush Kumar';
  const letters = useMemo(() => Array.from(NAME), []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] grid place-items-center bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
      >
        {/* Ambient blobs */}
        <motion.div
          className="absolute -top-24 -left-24 h-[60vmax] w-[60vmax] rounded-full blur-3xl
                     bg-gradient-to-tr from-cyan-500/25 via-fuchsia-500/20 to-purple-500/25"
          animate={{ x: [0, 60, -40, 0], y: [0, -30, 40, 0], rotate: [0, 30, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -right-28 h-[55vmax] w-[55vmax] rounded-full blur-3xl
                     bg-gradient-to-tr from-purple-500/25 via-cyan-400/20 to-fuchsia-500/25"
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -30, 0], rotate: [0, -25, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Sequencer wrapper so we can exit with a "dash away" motion */}
        <motion.div
          className="relative text-center px-6"
          initial={{ scale: 1, y: 0 }}
          animate={{ scale: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -60,
            scale: 0.92,
            transition: { duration: 0.55, ease: 'easeInOut' }
          }}
        >
          {/* 1) DASH: draws left -> right */}
          <motion.svg
            viewBox="0 0 1200 60"
            className="mx-auto w-[80vw] max-w-[900px]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <defs>
              <linearGradient id="dashG" x1="0" x2="1">
                <stop offset="0%"  stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
            </defs>
            <motion.path
              d="M40 30 H1160"
              fill="none"
              stroke="url(#dashG)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
          </motion.svg>

          {/* 2) NAME: per-letter pop with neon sweep */}
          <motion.h1
            className="mt-4 font-semibold tracking-[-0.04em] text-[12vw] md:text-7xl
                       bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { transition: { staggerChildren: 0.045, staggerDirection: -1 } },
              show:   { transition: { delay: 0.2, staggerChildren: 0.045 } },
            }}
          >
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block will-change-transform relative"
                variants={{
                  hidden: { y: 26, opacity: 0, filter: 'blur(8px)' },
                  show:   { y: 0,  opacity: 1, filter: 'blur(0px)', transition: { duration: 0.46, ease: 'easeOut' } }
                }}
              >
                <span>{ch === ' ' ? '\u00A0' : ch}</span>
                {/* neon sheen */}
                <motion.span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  style={{ mixBlendMode: 'overlay' }}
                  initial={{ x: '-130%', opacity: 0 }}
                  animate={{ x: '130%', opacity: [0, 1, 0] }}
                  transition={{ delay: 0.45 + i * 0.035, duration: 0.6, ease: 'easeInOut' }}
                />
              </motion.span>
            ))}
          </motion.h1>

          {/* 3) Subtitle (briefly visible) */}
          <motion.p
            className="mt-3 text-zinc-300/90 text-sm md:text-base"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.4 } }}
          >
            Incoming — Associate Developer @ Insurity
          </motion.p>

          {/* 4) Exit dash (shrinks and slides upward slightly) */}
          <motion.div
            className="mx-auto mt-5 h-[3px] w-[44vw] max-w-[420px] rounded-full bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, transition: { delay: 1.35, duration: 0.5, ease: 'easeOut' } }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
