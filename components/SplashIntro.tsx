'use client';
import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashIntro({ onDone }: { onDone: () => void }) {
  // Exit after the total sequence length
  const TOTAL_MS = 2800;

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mq?.matches) {
      onDone(); // no animation for reduced motion users
      return;
    }
    // Lock scroll while playing
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(onDone, TOTAL_MS);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = prev;
    };
  }, [onDone]);

  const letters = useMemo(() => Array.from('Aayush Kumar'), []);

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

        {/* Title */}
        <div className="relative text-center px-6">
          {/* Per-letter rise + glow sweep */}
          <motion.h1
            className="font-semibold tracking-[-0.04em] text-[12vw] md:text-7xl
                       bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { transition: { staggerChildren: 0.035, staggerDirection: -1 } },
              show:   { transition: { staggerChildren: 0.035 } },
            }}
          >
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: 22, opacity: 0, filter: 'blur(6px)' },
                  show:   {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    transition: { duration: 0.42, ease: 'easeOut' }
                  }
                }}
              >
                {/* Neon “sheen” sweep overlay */}
                <span className="relative">
                  <span>{ch === ' ' ? '\u00A0' : ch}</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    style={{ mixBlendMode: 'overlay' }}
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ x: '120%', opacity: [0, 1, 0] }}
                    transition={{ delay: 0.2 + i * 0.03, duration: 0.5, ease: 'easeInOut' }}
                  />
                </span>
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-3 text-zinc-300/90 text-sm md:text-base"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.4 } }}
          >
            Incoming — Associate Developer @ Insurity
          </motion.p>

          {/* Underline stroke (SVG path draws left→right) */}
          <motion.svg
            viewBox="0 0 600 30"
            className="mx-auto mt-4 w-[70vw] max-w-[560px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.path
              d="M10 20 Q 150 5 300 20 T 590 20"
              stroke="url(#g)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.95, duration: 0.7, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%"  stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
