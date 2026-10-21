import React, { useEffect, useState } from 'react';
import { Heart, Wind, X } from 'lucide-react';

const phases = [
  { label: 'Breathe in', hint: 'Gently breathe in through your nose.', duration: 4000 },
  { label: 'Hold softly', hint: 'Pause only if that feels comfortable.', duration: 2000 },
  { label: 'Breathe out', hint: 'Slowly let your breath go.', duration: 4000 },
];

export function BreathingSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    if (!isOpen) return undefined;

    const timer = window.setTimeout(() => {
      setPhaseIndex((current) => {
        const next = (current + 1) % phases.length;
        if (next === 0) setRounds((count) => count + 1);
        return next;
      });
    }, phases[phaseIndex].duration);

    return () => window.clearTimeout(timer);
  }, [isOpen, phaseIndex]);

  const closePanel = () => {
    setIsOpen(false);
    setPhaseIndex(0);
    setRounds(0);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open breathing support"
        className="fixed bottom-5 right-5 z-[80] flex items-center gap-2 rounded-full bg-zen-plum px-4 py-3 text-sm font-bold text-white shadow-xl transition hover:scale-105 hover:bg-zen-plumHover focus:outline-none focus:ring-4 focus:ring-rose-200"
      >
        <Heart className="h-5 w-5" />
        <span>I need a breather</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/45 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="breathing-support-title"
        >
          <section className="relative w-full max-w-md rounded-[2rem] border border-rose-100 bg-[#FFF8FA] p-6 text-center shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close breathing support"
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-rose-100 hover:text-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-zen-plum">
              <Wind className="h-7 w-7" />
            </div>

            <h2
              id="breathing-support-title"
              className="text-2xl font-extrabold text-zen-plum"
            >
              A little breathing space
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              You don’t have to fix everything right now. Let’s pause together.
              Follow along only as much as feels comfortable.
            </p>

            <div className="my-7 flex flex-col items-center">
              <div
                className={`flex h-36 w-36 items-center justify-center rounded-full bg-rose-200/70 text-center shadow-inner transition-transform duration-[1000ms] ${
                  phaseIndex === 0
                    ? 'scale-110'
                    : phaseIndex === 1
                    ? 'scale-110'
                    : 'scale-90'
                }`}
              >
                <span className="px-3 text-xl font-extrabold text-zen-plum">
                  {phases[phaseIndex].label}
                </span>
              </div>
              <p className="mt-5 min-h-12 text-sm text-slate-600">
                {phases[phaseIndex].hint}
              </p>
              {rounds > 0 && (
                <p className="mt-1 text-xs text-zen-mauve">
                  You’ve completed {rounds} gentle {rounds === 1 ? 'round' : 'rounds'}.
                </p>
              )}
            </div>

            <p className="mb-5 text-sm font-medium text-zen-plum">
              It’s okay to stop whenever you want.
            </p>
            <button
              type="button"
              onClick={closePanel}
              className="w-full rounded-full bg-zen-plum px-5 py-3 font-bold text-white transition hover:bg-zen-plumHover"
            >
              I’m ready to return
            </button>
          </section>
        </div>
      )}
    </>
  );
}

export default BreathingSupport;
