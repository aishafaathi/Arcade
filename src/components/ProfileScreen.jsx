
import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Shield,
  UserRound,
  CheckCircle,
  LogOut,
  Gamepad2,
  Trophy,
  Clock,
  LoaderCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export function ProfileScreen({ user, profile, onBack, onLogout, isAudioOn, setIsAudioOn }) {
  const [progress, setProgress] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressError, setProgressError] = useState('');

  const name = profile?.name || user?.user_metadata?.display_name || 'Player';
  const email = user?.email || 'No email available';
  const isActive = profile?.is_active !== false;

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setProgressError('');

      const { data, error } = await supabase
        .from('game_progress')
        .select('id, game_id, score, level, status, created_at, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (cancelled) return;

      if (error) {
        console.error('Could not load game progress:', error);
        setProgressError('Unable to load progress right now.');
        setProgress([]);
        setGames([]);
        setLoading(false);
        return;
      }

      const records = data || [];
      setProgress(records);

      const gameIds = [...new Set(records.map((item) => item.game_id).filter(Boolean))];

      if (gameIds.length) {
        const { data: gameData, error: gameError } = await supabase
          .from('games')
          .select('id, name, slug')
          .in('id', gameIds);

        if (cancelled) return;

        if (gameError) {
          console.error('Could not load game names:', gameError);
        }

        setGames(gameData || []);
      } else {
        setGames([]);
      }

      setLoading(false);
    }

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const getGameName = (gameId) =>
    games.find((game) => String(game.id) === String(gameId))?.name ||
    'Arcade Game';

  const formatDate = (date) => {
    if (!date) return 'Date unavailable';
    return new Date(date).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const recentGames = progress.slice(0, 5);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FFF9F5] px-4 py-8 sm:px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-zen-plum hover:text-zen-mauve transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Arcade
          </button>

          <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAudioOn?.(!isAudioOn)}
            aria-label={isAudioOn ? 'Turn sound off' : 'Turn sound on'}
            className="flex items-center gap-2 rounded-full bg-white border border-amber-200 px-4 py-2 text-sm font-bold text-zen-plum hover:bg-amber-50 transition"
          >
            {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            Sound {isAudioOn ? 'On' : 'Off'}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 rounded-full bg-white border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 transition"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-zen-pinkAccent/30 shadow-zen-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#FFF3F5] to-[#FCEBEF] px-6 sm:px-10 py-10 text-center">

            <div className="mx-auto w-24 h-24 rounded-full bg-zen-pinkAccent/40 flex items-center justify-center shadow-sm">
              <UserRound className="w-11 h-11 text-zen-plum" />
            </div>

            <h1 className="mt-5 text-3xl font-extrabold text-zen-plum font-display">
              {name}
            </h1>
            <p className="mt-1 text-sm text-zen-mauve">Your Arcade Profile</p>
          </div>

          <div className="p-6 sm:p-10 space-y-4">
            {[
              { label: 'Name', value: name, Icon: UserRound },
              { label: 'Email', value: email, Icon: Mail },
              { label: 'Account Status', value: isActive ? 'Active' : 'Inactive', Icon: CheckCircle },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl bg-[#FFF9F5] p-4 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-zen-pinkAccent/40 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-zen-plum" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-zen-mauve">{label}</p>
                  <p className={`text-sm font-bold text-zen-plum break-words [overflow-wrap:anywhere] ${label === 'Email' ? 'normal-case' : 'capitalize'}`}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-zen-pinkAccent/30 bg-white p-6 sm:p-8 shadow-zen-lg">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-zen-pinkAccent/40 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-zen-plum" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-zen-plum">My Progress</h2>
              <p className="text-sm text-zen-mauve">Your saved game activity</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 py-5 text-sm text-zen-mauve">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Loading your progress...
            </div>
          ) : progressError ? (
            <p className="text-sm text-rose-600">{progressError}</p>
          ) : progress.length === 0 ? (
            <div className="rounded-2xl bg-[#FFF9F5] p-5 text-center">
              <Gamepad2 className="w-8 h-8 mx-auto mb-2 text-zen-mauve" />
              <p className="font-bold text-zen-plum">No saved progress yet</p>
              <p className="mt-1 text-sm text-zen-mauve">
                Play a game to see progress here once the game saves it.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-2xl bg-[#FFF9F5] p-4">
                  <p className="text-xs text-zen-mauve">Saved game records</p>
                  <p className="mt-1 text-2xl font-extrabold text-zen-plum">
                    {progress.length}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#FFF9F5] p-4">
                  <p className="text-xs text-zen-mauve">Games played</p>
                  <p className="mt-1 text-2xl font-extrabold text-zen-plum">
                    {new Set(progress.map((item) => item.game_id)).size}
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-zen-plum mb-3">Recently Played</h3>
              <div className="space-y-3">
                {recentGames.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-[#FFF9F5] p-4">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-zen-pinkAccent/40 flex items-center justify-center">
                      <Gamepad2 className="w-5 h-5 text-zen-plum" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-zen-plum">
                        {getGameName(item.game_id)}
                      </p>
                      <p className="mt-1 text-xs text-zen-mauve">
                        {item.status ? `Status: ${item.status} · ` : ''}
                        <Clock className="inline w-3 h-3 mr-1" />
                        {formatDate(item.updated_at || item.created_at)}
                      </p>
                    </div>
                    {item.score != null && (
                      <span className="text-xs font-bold text-zen-plum">
                        Score: {item.score}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
