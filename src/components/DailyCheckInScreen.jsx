import React, { useEffect, useState } from 'react';

const MOOD_OPTIONS = [
  { label: 'Happy', emoji: '☀️', game: 'feeling_fusion', suggestion: 'Keep that good feeling going with Feeling Fusion.' },
  { label: 'Tired', emoji: '🌙', game: 'words_of_wisdom', suggestion: 'Take it gently with a little encouragement.' },
  { label: 'Anxious', emoji: '🌧️', game: 'little_big_feelings', suggestion: 'Little Big Feelings can help you explore what you feel.' },
  { label: 'Curious', emoji: '🔎', game: 'myth_vs_fact', suggestion: 'Follow your curiosity with Myth vs Fact.' },
  { label: 'Not sure', emoji: '🌱', game: 'signal_scout', suggestion: 'No need to decide yet. Try a gentle little discovery.' },
];

function getLocalDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function MoodCheckIn({ profile, onSaveDailyMood, onSelectGame }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [skipped, setSkipped] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const today = getLocalDateKey();

  useEffect(() => {
    if (profile?.daily_mood_date === today && profile?.daily_mood) {
      setSelectedMood(profile.daily_mood);
    }
  }, [profile?.daily_mood, profile?.daily_mood_date, today]);

  const chosenOption = MOOD_OPTIONS.find((option) => option.label === selectedMood);

  const chooseMood = async (mood) => {
    setErrorMessage('');
    setSelectedMood(mood);
    setSkipped(false);

    if (!onSaveDailyMood) return;

    setSaving(true);
    const result = await onSaveDailyMood(mood);
    setSaving(false);

    if (result?.error) {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="mt-5 rounded-2xl bg-[#FFF5F7] p-4 sm:p-5">
      <h3 className="text-lg font-extrabold text-zen-plum">How are you arriving today?</h3>
      <p className="mt-1 text-sm text-zen-mauve">A check-in just for you. You can change your answer anytime.</p>

      {!skipped && (
        <div className="mt-3 flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              disabled={saving}
              onClick={() => chooseMood(option.label)}
              aria-pressed={selectedMood === option.label}
              className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                selectedMood === option.label
                  ? 'border-zen-plum bg-zen-plum text-white'
                  : 'border-[#E8C9D4] bg-white text-zen-plum hover:bg-[#FCEBEF]'
              } disabled:opacity-60`}
            >
              <span className="mr-1">{option.emoji}</span>{option.label}
            </button>
          ))}
        </div>
      )}

      {saving && <p className="mt-3 text-sm text-zen-mauve">Saving your check-in…</p>}
      {errorMessage && <p role="alert" className="mt-3 text-sm text-red-700">{errorMessage}</p>}

      {chosenOption && !skipped && (
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-sm text-zen-mauve">{chosenOption.suggestion}</p>
          <button
            type="button"
            onClick={() => onSelectGame(chosenOption.game)}
            className="self-start rounded-full bg-zen-plum px-4 py-2 text-sm font-bold text-white hover:opacity-90"
          >
            Try this game
          </button>
        </div>
      )}

      {!skipped && !selectedMood && (
        <button
          type="button"
          onClick={() => setSkipped(true)}
          className="mt-3 text-sm font-semibold text-zen-mauve underline underline-offset-4"
        >
          Skip for now
        </button>
      )}

      {skipped && (
        <div className="mt-3 flex items-center gap-3">
          <p className="text-sm text-zen-mauve">That’s completely okay. Make yourself at home.</p>
          <button
            type="button"
            onClick={() => setSkipped(false)}
            className="text-sm font-semibold text-zen-plum underline underline-offset-4"
          >
            Check in
          </button>
        </div>
      )}
    </div>
  );
}


const LITTLE_NOTES = [
  "You don't have to figure everything out today.",
  "Small steps are still steps forward.",
  "You deserve the same kindness you give to others.",
  "Rest is allowed. You do not have to earn it.",
  "It is okay to begin again, as many times as you need.",
  "You can take things one breath at a time.",
  "Your feelings deserve space, even when they are complicated.",
  "You are allowed to grow at your own pace.",
  "Doing your best can look different from day to day.",
  "You do not need to have everything figured out to be worthy.",
  "A difficult moment is only one part of your story.",
  "Give yourself permission to pause.",
  "You can be a work in progress and still be wonderful.",
  "There is no single right way to move through today."
];

function DailyLittleNote() {
  const [savedNotes, setSavedNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lumina-saved-little-notes') || '[]');
    } catch {
      return [];
    }
  });
  const [showSaved, setShowSaved] = useState(false);

  const today = getLocalDateKey();
  const dayNumber = Math.floor(
    new Date(`${today}T12:00:00`).getTime() / 86400000
  );
  const note = LITTLE_NOTES[((dayNumber % LITTLE_NOTES.length) + LITTLE_NOTES.length) % LITTLE_NOTES.length];
  const isSaved = savedNotes.includes(note);

  const toggleSaved = () => {
    const next = isSaved
      ? savedNotes.filter((item) => item !== note)
      : [...savedNotes, note];

    setSavedNotes(next);
    localStorage.setItem('lumina-saved-little-notes', JSON.stringify(next));
  };

  return (
    <section className="mt-6 rounded-2xl border border-[#F0D6E0] bg-gradient-to-br from-[#FFF5F8] to-[#F8F2FF] p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-zen-mauve">
        A little note for today 💌
      </p>

      <p className="mt-3 text-xl font-bold leading-relaxed text-zen-plum">
        “{note}”
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={toggleSaved}
          aria-pressed={isSaved}
          className="rounded-full bg-zen-plum px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          {isSaved ? '♥ Saved to Favourites' : '♡ Save this note'}
        </button>

        <button
          type="button"
          onClick={() => setShowSaved((previous) => !previous)}
          aria-expanded={showSaved}
          className="rounded-full border border-[#D9B5C4] bg-white/80 px-4 py-2 text-sm font-bold text-zen-plum hover:bg-white"
        >
          {showSaved ? 'Hide saved notes' : `My saved notes (${savedNotes.length})`}
        </button>
      </div>

      {showSaved && (
        <div className="mt-4 space-y-2">
          <h3 className="font-bold text-zen-plum">Notes you’ve kept</h3>
          {savedNotes.length === 0 ? (
            <p className="text-sm text-zen-mauve">
              Your favourite notes will appear here when you save one.
            </p>
          ) : (
            <ul className="space-y-2">
              {savedNotes.map((savedNote) => (
                <li
                  key={savedNote}
                  className="rounded-xl bg-white/80 p-3 text-sm leading-relaxed text-zen-plum"
                >
                  “{savedNote}”
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export function DailyCheckInScreen({
  user,
  profile,
  onSaveDailyMood,
  onSelectGame,
  onBackToArcade,
}) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full mx-auto py-8 px-4 sm:px-6 overflow-hidden bg-[#FCEBEF] bg-[url(/arcade-doodles.png)] bg-repeat bg-[length:900px_auto]">
      <section className="relative z-10 max-w-3xl mx-auto rounded-3xl border border-white/80 bg-white/90 p-5 sm:p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-zen-mauve">
          A little space just for you
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-zen-plum font-display">
          Welcome, {profile?.name || user?.name || 'friend'} 💗
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zen-mauve">
          You don’t have to feel any particular way to be here. Pick what feels right, or skip and explore.
        </p>

        <MoodCheckIn
          profile={profile}
          onSaveDailyMood={onSaveDailyMood}
          onSelectGame={onSelectGame}
        />

        <DailyLittleNote />

        <button
          type="button"
          onClick={onBackToArcade}
          className="mt-6 rounded-full border border-[#D9B5C4] px-5 py-2.5 text-sm font-bold text-zen-plum hover:bg-[#FFF5F7]"
        >
          ← Back to Arcade
        </button>
      </section>
    </div>
  );
}
