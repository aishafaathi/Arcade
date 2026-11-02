import React from 'react';
import { ArrowLeft, Heart, Brain, Code2, Gamepad2, Sparkles } from 'lucide-react';

export function AboutScreen({ onBack }) {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#FCEBEF] bg-[url(/arcade-doodles.png)] bg-repeat bg-[length:900px_auto] px-4 py-8 sm:px-6 lg:px-10">
      <div className="relative z-10 mx-auto w-full max-w-6xl">

        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E9C5D0] bg-white px-5 py-2.5 text-sm font-bold text-[#60404F] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Arcade
        </button>

        {/* Hero */}
        <header className="relative overflow-hidden rounded-[2rem] border border-white bg-white/95 px-6 py-9 text-center shadow-xl sm:px-12 sm:py-12">

          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#FCE5EC] blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#FFF0D2] blur-2xl" />

          <div className="relative">
            <img
              src="/arcade-logo.png"
              alt="Arcade logo"
              className="mx-auto mb-6 block h-24 w-24 rounded-2xl bg-white p-2 object-contain shadow-sm"
            />

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#FCEBEF] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#A66B80]">
              <Sparkles className="h-4 w-4" />
              Welcome to Arcade
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#513644] sm:text-5xl">
              About Our Arcade
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#967483] sm:text-base">
              A playful, welcoming space where games encourage reflection,
              emotional awareness, and mind empowerment.
            </p>

            <div className="mt-6 flex justify-center gap-2">
              <span className="h-2.5 w-8 rounded-full bg-[#F4C542]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F28C28]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#60404F]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E9B9C9]" />
            </div>
          </div>
        </header>

        {/* About and Team */}
        <section className="mt-7 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {/* Mind Empowerment */}
          <article className="overflow-hidden rounded-[2rem] border border-[#F2D99B] bg-gradient-to-br from-[#FFF8E8] to-[#FFF0D5] p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9">

            <img
              src="/ME.jpeg"
              alt="Mind Empowered logo"
              className="mb-6 h-24 w-24 rounded-2xl bg-white p-2 object-contain shadow-sm"
            />

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B58A4D]">
              Our inspiration
            </p>

            <h2 className="text-2xl font-extrabold text-[#604638]">
              Mind Empowerment
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#91745F] sm:text-base">
              Mind Empowered is an organisation dedicated to mental health
              awareness, education, and advocacy. Its vision is to empower
              individuals to navigate life with emotional resilience and to
              build a more empathetic community.
            </p>

            <p className="mt-4 text-sm leading-8 text-[#91745F] sm:text-base">
              Arcade reflects these values through interactive games that
              encourage self-awareness, emotional understanding, and
              personal growth.
            </p>

            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-[#F1DDB5] bg-white/70 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0D5]">
                <Heart className="h-5 w-5 text-[#D88B42]" />
              </div>
              <p className="text-sm font-semibold leading-6 text-[#80634E]">
                Encouraging emotional awareness, one experience at a time.
              </p>
            </div>
          </article>

          {/* Development Team */}
          <article className="rounded-[2rem] border border-[#EBCBD6] bg-white/95 p-7 shadow-lg transition duration-300 hover:shadow-xl sm:p-9">

            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FCEBEF]">
                <Gamepad2 className="h-7 w-7 text-[#80566A]" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B17C91]">
                  The people behind Arcade
                </p>
                <h2 className="text-2xl font-extrabold text-[#513644]">
                  Development Team
                </h2>
              </div>
            </div>

            {/* Team photos */}
            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-[#FFF3F6] p-3 text-center">
                <img
                  src="/Aisha.jpg"
                  alt="Aisha"
                  className="mx-auto aspect-square w-full max-w-[170px] rounded-2xl object-cover shadow-md"
                />

                <h3 className="mt-4 text-lg font-extrabold text-[#513644]">
                  Aisha
                </h3>

                <p className="mt-1 text-xs font-medium leading-5 text-[#A47B8B] sm:text-sm">
                  Backend Development
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF3F6] p-3 text-center">
                <img
                  src="/Abiram.jpeg"
                  alt="Abiram"
                  className="mx-auto aspect-square w-full max-w-[170px] rounded-2xl object-cover shadow-md"
                />

                <h3 className="mt-4 text-lg font-extrabold text-[#513644]">
                  Abiram
                </h3>

                <p className="mt-1 text-xs font-medium leading-5 text-[#A47B8B] sm:text-sm">
                  Arcade Game Development
                </p>

                <a
                  href="https://github.com/JustRamm"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs font-bold text-[#80566A] underline underline-offset-4 hover:text-[#B17C91]"
                >
                  Explore GitHub
                </a>
              </div>
            </div>

            {/* Frontend contributors */}
            <div className="mt-6 rounded-2xl border border-[#EED8E0] bg-[#FDF5F8] p-5">

              <div className="mb-3 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-[#A66B80]" />
                <h3 className="font-extrabold text-[#60404F]">
                  Website Frontend
                </h3>
              </div>

              <p className="text-sm leading-7 text-[#967483]">
                Unais and Anushka also contributed to developing the
                website frontend, helping bring the Arcade experience
                to life.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#EBCBD6] bg-white px-4 py-2 text-sm font-bold text-[#80566A]">
                  Unais
                </span>
                <span className="rounded-full border border-[#EBCBD6] bg-white px-4 py-2 text-sm font-bold text-[#80566A]">
                  Anushka
                </span>
              </div>
            </div>

          </article>
        </section>

        {/* Footer */}
        <footer className="mt-7 rounded-[2rem] border border-white bg-white/90 px-5 py-6 text-center shadow-md">
          <div className="mb-2 flex justify-center">
            <Heart className="h-5 w-5 fill-[#E9B9C9] text-[#C7869D]" />
          </div>
          <p className="text-sm font-semibold text-[#765365]">
            Made with care for a more mindful play experience.
          </p>
        </footer>

      </div>
    </main>
  );
}