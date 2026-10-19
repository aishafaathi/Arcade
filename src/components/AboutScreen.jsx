import React from 'react';
import { ArrowLeft, Heart, Brain, Gamepad2, Code2, Sparkles } from 'lucide-react';

export function AboutScreen({ onBack }) {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#FCEBEF] bg-[url(/arcade-doodles.png)] bg-repeat bg-[length:900px_auto] px-4 py-8 sm:px-6 lg:px-10">
      <div className="relative z-10 mx-auto max-w-5xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-zen-pinkAccent/40 bg-white/90 px-4 py-2 text-sm font-bold text-zen-plum shadow-sm transition hover:bg-zen-pinkLight"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Arcade
        </button>

        <header className="rounded-[2rem] border border-zen-pinkAccent/40 bg-white/90 p-7 text-center shadow-zen-lg backdrop-blur-sm sm:p-12">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#F4C542] bg-[#FFF3D6]">
            <Sparkles className="h-8 w-8 text-[#F28C28]" />
          </div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-zen-mauve">
            Welcome to Lumina Zen
          </p>
          <h1 className="text-3xl font-extrabold text-zen-plum font-display sm:text-5xl">
            About Our Arcade
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zen-mauve sm:text-base">
            A playful, welcoming space where games encourage reflection,
            emotional awareness, and mind empowerment.
          </p>
          <div className="mt-5 flex justify-center gap-3" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#F4C542]" />
            <span className="h-3 w-3 rounded-full bg-[#F28C28]" />
            <span className="h-3 w-3 rounded-full bg-[#242124]" />
            <span className="h-3 w-3 rounded-full bg-[#F7C5D1]" />
          </div>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-[#F4C542]/70 bg-[#FFF3D6]/95 p-6 shadow-zen">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
              <Brain className="h-6 w-6 text-[#F28C28]" />
            </div>
            <h2 className="text-xl font-extrabold text-zen-plum">Mind Empowerment</h2>
            <p className="mt-3 text-sm leading-7 text-zen-mauve">
              Mind Empowered is an organisation dedicated to mental health awareness,
              education, and advocacy. Its vision is to empower individuals to navigate
              life with emotional resilience and to build a more empathetic community.
              Arcade reflects these values through interactive games that encourage
              self-awareness, emotional understanding, and personal growth.
            </p>
          </article>

          <article className="rounded-3xl border border-zen-pinkAccent/40 bg-white/95 p-6 shadow-zen">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCEBEF]">
              <Gamepad2 className="h-6 w-6 text-zen-plum" />
            </div>
            <h2 className="text-xl font-extrabold text-zen-plum">Game Creators</h2>
            <p className="mt-3 text-sm leading-7 text-zen-mauve">
              <strong className="font-extrabold text-zen-plum">Abiram (Ram)</strong> contributed to creating the Arcade games, bringing interactive
              experiences to life through game design and development. His GitHub work
              includes Stickman to the Rescue, an educational game designed to help players
              recognise warning signs, respond with empathy, and connect people with support.
              <a href="https://github.com/JustRamm" target="_blank" rel="noreferrer"
                 className="mt-3 inline-block font-bold underline text-zen-plum">
                Explore Ram's GitHub
              </a>
            </p>
          </article>

          <article className="rounded-3xl border border-[#242124]/15 bg-white/95 p-6 shadow-zen">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#242124]">
              <Code2 className="h-6 w-6 text-[#F4C542]" />
            </div>
            <h2 className="text-xl font-extrabold text-zen-plum">Website Creators</h2>
            <p className="mt-3 text-sm leading-7 text-zen-mauve">
              The Arcade website was created by Unais, Aisha, and Anushka, bringing together the website’s design, development, and user experience.
            </p>
          </article>
        </section>

        <footer className="mt-6 rounded-3xl border border-zen-pinkAccent/40 bg-white/90 p-5 text-center shadow-sm">
          <p className="text-sm font-semibold text-zen-plum">
            Made with care for a more mindful play experience.
          </p>
        </footer>
      </div>
    </main>
  );
}
