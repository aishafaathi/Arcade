import React, { useEffect, useRef, useState } from 'react';
import { Search, Sparkles, Play, Rocket } from 'lucide-react';
import { sounds } from '../SoundEffects';

export function Screen2_ArcadeCollection({ onSelectGame }) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleNavbarSearch = (event) => {
      setSearchQuery(event.detail || '');
    };

    window.addEventListener('arcade-search-change', handleNavbarSearch);
    return () => window.removeEventListener('arcade-search-change', handleNavbarSearch);
  }, []);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const focusSearch = () => {
      searchInputRef.current?.focus();
    };

    window.addEventListener('focus-arcade-search', focusSearch);
    return () => window.removeEventListener('focus-arcade-search', focusSearch);
  }, []);

  const games = [
    {
      id: 'words_of_wisdom',
      title: 'Words of Wisdom',
      category: 'Mindful Puzzles',
      badgeColor: 'bg-zen-pinkAccent text-zen-plum',
      description: 'A calming puzzle and quote experience to inspire mindfulness.',
      bgGradient: 'from-[#FFF3F5] to-[#FCEBEF]',
      borderColor: 'border-zen-pinkAccent',
      imageSvg: (
        <img
          src="/words-of-wisdom-logo.svg"
          alt="Words of Wisdom"
          className="h-32 w-full object-contain"
        />
      )
    },
    {
      id: 'stick_man',
      title: 'Stick Man to the Rescue',
      category: 'Physics & Play',
      badgeColor: 'bg-zen-creamBg text-zen-plum',
      description: 'A lighthearted physics puzzle to guide your stick figure home.',
      bgGradient: 'from-[#FAF7F2] to-[#E8E3C5]/40',
      borderColor: 'border-zen-creamBg',
      imageSvg: (
        <img
          src="/game-logos/stick-man.svg"
          alt="Stick Man to the Rescue"
          className="h-32 w-full object-contain"
        />
      
      )
    },
    {
      id: 'little_big_feelings',
      title: 'Little Big Feelings',
      category: 'Mood & Feelings',
      badgeColor: 'bg-zen-oliveBg text-zen-olive',
      description: 'Explore and process your emotions with interactive blob friends.',
      bgGradient: 'from-[#EFF2E1] to-[#E3E8CE]',
      borderColor: 'border-zen-olive/40',
      imageSvg: (
        <img
          src="/game-logos/little-big-feelings.svg"
          alt="Little Big Feelings"
          className="h-32 w-full object-contain"
        />
      
      )
    },
    /* Mindscape Defense temporarily disabled
    {
      id: 'mindscape_defense',
      title: 'Mindscape Defense',
      category: 'Mind & Coping',
      badgeColor: 'bg-zen-tealBg text-zen-teal',
      description: 'Build healthy coping skills and protect your mental wellbeing through mindful challenges.',
      bgGradient: 'from-[#E8F7F5] to-[#D8F0EC]',
      borderColor: 'border-zen-teal/40',
      imageSvg: (
        <img
          src="/mindscape-defense-logo.svg"
          alt="Mindscape Defense"
          className="h-32 w-full object-contain"
        />
      )
    },
    */
    {
      id: 'feeling_fusion',
      title: 'Feeling Fusion',
      category: 'Mood & Feelings',
      badgeColor: 'bg-zen-yellow text-zen-plum',
      description: 'Blend emotions together and discover what your feelings are trying to say.',
      bgGradient: 'from-[#FFF7D6] to-[#FDECC8]',
      borderColor: 'border-zen-yellow',
      imageSvg: (
        <img
          src="/game-logos/feeling-fusion.svg"
          alt="Feeling Fusion"
          className="h-32 w-full object-contain"
        />
      
      )
    },
    {
      id: 'myth_vs_fact',
      title: 'Myth vs Fact',
      category: 'Mindful Puzzles',
      badgeColor: 'bg-zen-tealBg text-zen-teal',
      description: 'Sort mental-health statements into myths and facts through a calm card challenge.',
      bgGradient: 'from-[#E8F7F5] to-[#D9EEEC]',
      borderColor: 'border-zen-teal/40',
      imageSvg: (
        <img
          src="/game-logos/myth-vs-fact.svg"
          alt="Myth vs Fact"
          className="h-32 w-full object-contain"
        />
      
      )
    },
    {
      id: 'signal_scout',
      title: 'Signal Scout',
      category: 'Pathway Flow',
      badgeColor: 'bg-zen-pinkAccent text-zen-plum',
      description: 'Learn to notice signals of distress and choose compassionate ways to respond.',
      bgGradient: 'from-[#F3F0FF] to-[#E7E0FA]',
      borderColor: 'border-indigo-200',
      imageSvg: (
        <img
          src="/game-logos/signal-scout.svg"
          alt="Signal Scout"
          className="h-32 w-full object-contain"
        />
      
      )
    }
  ];

  const visibleGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-[calc(100%_-_1rem)] mx-auto py-4 px-2 sm:px-3 lg:px-4 overflow-hidden bg-[#FCEBEF] bg-[url(/arcade-doodles.png)] bg-repeat bg-[length:900px_auto]">

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zen-plum font-display">
            Arcade Collection
          </h2>
          <p className="text-sm text-zen-mauve mt-1">
            Choose a game to enter its dedicated hub. You can exit back to the arcade at any time.
          </p>
        </div>


      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {visibleGames.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              sounds.playLaunch();
              onSelectGame(game.id);
            }}
            className={`bg-gradient-to-b ${game.bgGradient} rounded-3xl p-5 border ${game.borderColor} shadow-zen hover:shadow-zen-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1`}
          >
            <div>
              {/* Card Illustration */}
              <div className="relative rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:scale-102 transition-transform duration-300">
                {game.imageSvg}
                <span className={`absolute top-3 left-3 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm ${game.badgeColor}`}>
                  {game.tag}
                </span>
              </div>

              {/* Title & Category */}
              <h3 className="text-xl font-extrabold text-zen-plum font-display group-hover:text-zen-mauve transition-colors">
                {game.title}
              </h3>
              <p className="text-xs font-semibold text-zen-mauve mt-0.5 mb-2">
                {game.category}
              </p>

              {/* Description */}
              <p className="text-xs text-zen-plum/80 leading-relaxed mb-6">
                {game.description}
              </p>
            </div>

            {/* Action Button: Enter Game */}
            <div className="pt-2 border-t border-black/5">
              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl bg-zen-plum hover:bg-zen-plumHover text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 group-hover:scale-102"
              >
                <Play className="w-3.5 h-3.5 fill-current text-zen-pinkAccent" />
                <span>Enter {game.title}</span>
              </button>
            </div>

          </div>
        ))}
      </div>



    </div>
  );
}
