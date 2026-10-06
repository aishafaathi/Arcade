import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

const pages = [
  {
    title: 'Welcome to Arcade',
    text: 'Arcade is a safe, calming space where you can explore games designed around wellbeing, feelings, mindfulness, and healthy coping.',
    icon: '🎮',
  },
  {
    title: 'Play, Explore & Learn',
    text: 'Try different games at your own pace. Each experience gives you a simple way to explore thoughts, emotions, and helpful ways of coping.',
    icon: '🌱',
  },
  {
    title: 'Your Progress Matters',
    text: 'As you play, your progress can be saved to your profile so you can continue your Arcade journey later.',
    icon: '✨',
  },
];

export function OnboardingScreen({ onComplete }) {
  const [currentPage, setCurrentPage] = useState(0);

  const page = pages[currentPage];
  const isLastPage = currentPage === pages.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      onComplete();
      return;
    }

    setCurrentPage((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-[2rem] shadow-zen-lg border border-zen-pinkAccent/30 overflow-hidden">
          <div className="px-6 sm:px-10 pt-8 text-center">
            <div className="flex justify-center mb-5">
              <img
                src="/ME.jpeg"
                alt="Mind Empowered"
                className="h-20 w-auto object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zen-pinkAccent/30 text-zen-plum text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              Welcome
            </div>
          </div>

          <div className="px-6 sm:px-12 py-10 text-center">
            <div className="text-6xl mb-6">{page.icon}</div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-zen-plum font-display mb-4">
              {page.title}
            </h1>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-zen-mauve leading-relaxed">
              {page.text}
            </p>
          </div>

          <div className="px-6 sm:px-10 pb-8">
            <div className="flex justify-center gap-2 mb-7">
              {pages.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentPage
                      ? 'w-8 bg-zen-plum'
                      : 'w-2 bg-zen-pinkAccent/50'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentPage === 0}
                className="px-4 py-3 rounded-xl text-sm font-bold text-zen-plum disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zen-pinkAccent/20 transition"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-zen-plum hover:bg-zen-plumHover text-white text-sm font-bold shadow-md transition"
              >
                <span className="flex items-center gap-2">
                  {isLastPage ? 'Enter Arcade' : 'Next'}
                  {!isLastPage && <ArrowRight className="w-4 h-4" />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
