'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashIntro({ onDone }: { onDone: () => void }) {
  // Respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mq?.matches) {
      onDone();
      return;
    }
    // Temporarily lock scroll
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(onDone, 1600); // total duration
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = prev;
    };
  }, [onDone]);

  const letters = Array.from('Aayush Kumar');

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] grid place-items-center bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.35 } }}
      >
        {/* soft animated blobs */}
        <motion.div
          className="absolute -top-24 -left-24 h-[60vmax] w-[60vmax] rounded-full blur-3xl
                     bg-gradient-to-tr from-cyan-500/25 via-fuchsia-500/20 to-purple-500/25"
          animate={{ x: [0, 60, -40, 0], y: [0, -30, 40, 0], rotate: [0, 30, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -right-28 h-[55vmax] w-[55vmax] rounded-full blur-3xl
                     bg-gradient-to-tr from-purple-500/25 via-cyan-400/20 to-fuchsia-500/25"
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -30, 0], rotate: [0, -25, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* name */}
        <div className="relative text-center">
          <motion.h1
            className="text-[10vw] md:text-7xl font-semibold tracking-[-0.04em]
                       bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              show:   { transition: { staggerChildren: 0.03 } },
            }}
          >
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { y: 18, opacity: 0, filter: 'blur(6px)' },
                  show:   { y: 0,  opacity: 1, filter: 'blur(0px)', transition: { duration: 0.38, ease: 'easeOut' } }
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-3 text-zinc-300/90 text-sm md:text-base"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.35 } }}
          >
            building clean, useful software
          </motion.p>
        </div>

        {/* skip (just in case) */}
        <button
          onClick={onDone}
          className="absolute bottom-6 right-6 text-xs text-zinc-400 hover:text-white/90"
        >
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
