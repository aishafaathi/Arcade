
import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Shield,
  ShieldCheck,
  UserRound,
  CheckCircle,
  Pencil,
  Save,
  X,
  LogOut,
  Gamepad2,
  Trophy,
  Clock,
  LoaderCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export function ProfileScreen({ user, profile, profileRole, onGoToAdmin, onBack, onLogout, isAudioOn, setIsAudioOn }) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(profile?.name || '');
  const [avatarKey, setAvatarKey] = useState('cat');
  const [dailyMood, setDailyMood] = useState('');
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [progress, setProgress] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressError, setProgressError] = useState('');

  const name = profile?.name || user?.user_metadata?.display_name || 'Player';

  // ARCADE_PROFILE_PREFERENCES
  const animalAvatars = [
    { key: 'lion', label: 'Lion', image: '/assets/avatars/avatar_1.svg' },
    { key: 'elephant', label: 'Elephant', image: '/assets/avatars/avatar_2.svg' },
    { key: 'penguin', label: 'Penguin', image: '/assets/avatars/avatar_3.svg' },
    { key: 'panda', label: 'Panda', image: '/assets/avatars/avatar_4.svg' },
    { key: 'cat', label: 'Cat', image: '/assets/avatars/avatar_5.svg' },
    { key: 'dog', label: 'Dog', image: '/assets/avatars/avatar_6.svg' },
    { key: 'monkey', label: 'Monkey', image: '/assets/avatars/avatar_7.svg' },
    { key: 'rabbit', label: 'Rabbit', image: '/assets/avatars/avatar_8.svg' },
    { key: 'frog', label: 'Frog', image: '/assets/avatars/avatar_9.svg' },
    { key: 'owl', label: 'Owl', image: '/assets/avatars/avatar_10.svg' },
    { key: 'bee', label: 'Bee', image: '/assets/avatars/avatar_11.svg' },
    { key: 'butterfly', label: 'Butterfly', image: '/assets/avatars/avatar_12.svg' },
  ];
  const moods = [
    { value: 'happy', label: 'Happy', image: '/assets/emotion/joy/select.svg' },
    { value: 'okay', label: 'Okay', image: '/assets/emotion/trust/select.svg' },
    { value: 'low', label: 'Low', image: '/assets/emotion/sadness/select.svg' },
    { value: 'anxious', label: 'Anxious', image: '/assets/emotion/fear/select.svg' },
    { value: 'tired', label: 'Tired', image: '/assets/emotion/sadness/select.svg' },
  ];
  const selectedAvatar = animalAvatars.find((avatar) => avatar.key === avatarKey) || animalAvatars[0];
  const email = user?.email || 'No email available';

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

  useEffect(() => {
    let cancelled = false;

    async function loadProfilePreferences() {
      if (!user?.id) return;

      const [{ data: profileData, error: profileError }, { data: gameData, error: gamesError }] =
        await Promise.all([
          supabase
            .from('profiles')
            .select('avatar_key, favorite_game_id, daily_mood, daily_mood_date')
            .eq('id', user.id)
            .maybeSingle(),
          supabase
            .from('games')
            .select('id, name, slug')
            .eq('is_active', true)
            .order('name', { ascending: true }),
        ]);

      if (cancelled) return;

      if (profileError) {
        console.error('Could not load profile preferences:', profileError);
      } else if (profileData) {
        setAvatarKey(profileData.avatar_key || 'cat');
        const today = new Date().toLocaleDateString('en-CA');
        setDailyMood(profileData.daily_mood_date === today ? (profileData.daily_mood || '') : '');
      }

      if (gamesError) {
        console.error('Could not load favourite-game options:', gamesError);
      } else {
        setGames(gameData || []);
      }
      setPreferencesLoaded(true);
    }

    loadProfilePreferences();
    return () => { cancelled = true; };
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
  const saveProfileName = async () => {
    const trimmedName = editName.trim();
    if (!trimmedName) {
      setProfileMessage('Name cannot be empty.');
      return;
    }
    if (!user?.id) {
      setProfileMessage('Your session is not available. Please try again.');
      return;
    }

    setSavingProfile(true);
    setProfileMessage('');

    const today = new Date().toLocaleDateString('en-CA');
    const { error } = await supabase
      .from('profiles')
      .update({
        name: trimmedName,
        avatar_key: avatarKey,
        daily_mood: dailyMood || null,
        daily_mood_date: dailyMood ? today : null,
      })
      .eq('id', user.id);

    setSavingProfile(false);

    if (error) {
      console.error('Could not update profile preferences:', error);
      setProfileMessage('Could not save changes. Please try again.');
      return;
    }

    setProfileMessage('Profile updated!');
    setEditing(false);
    window.location.reload();
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#FCEBEF] bg-[url(/arcade-doodles.png)] bg-repeat bg-[length:900px_auto] px-4 py-8 sm:px-6 lg:px-10">
      <div className="relative mx-auto w-full max-w-7xl">
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
          {profileRole === 'admin' && (
            <button
              type="button"
              onClick={onGoToAdmin}
              className="flex items-center gap-2 rounded-full bg-zen-plum px-4 py-2 text-sm font-bold text-white hover:bg-zen-plumHover transition"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Dashboard
            </button>
          )}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('arcade-open-about'))}
            className="flex items-center gap-2 rounded-full bg-white border border-zen-pinkAccent/50 px-4 py-2 text-sm font-bold text-zen-plum hover:bg-[#FFF3F5] transition"
          >
            About
          </button>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-[2rem] border border-zen-pinkAccent/30 shadow-zen-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#FFF3F5] to-[#FCEBEF] px-6 sm:px-10 py-10 text-center">

            <div className="mx-auto w-24 h-24 rounded-full bg-zen-pinkAccent/40 flex items-center justify-center shadow-sm">
              <img src={selectedAvatar.image} alt={selectedAvatar.label} className="h-16 w-16 object-contain" />
            </div>

            <h1 className="mt-5 text-3xl font-extrabold text-zen-plum font-display">
              {name}
            </h1>
            <p className="mt-1 text-sm text-zen-mauve">Your Arcade Profile</p>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setEditName(name);
                  setProfileMessage('');
                  setEditing((value) => !value);
                }}
                className="flex items-center gap-2 rounded-full border border-zen-pinkAccent/50 bg-white px-4 py-2 text-sm font-bold text-zen-plum hover:bg-[#FFF3F5]"
              >
                <Pencil className="h-4 w-4" />
                {editing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
            {editing && (
              <div className="mx-auto mt-4 max-w-md rounded-2xl bg-white p-4 text-left shadow-sm">
                <label htmlFor="profile-edit-name" className="mb-1 block text-sm font-bold text-zen-plum">
                  Name
                </label>
                <input
                  id="profile-edit-name"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  maxLength={80}
                  className="w-full rounded-xl border border-zen-pinkAccent/50 px-3 py-2 text-sm text-zen-plum outline-none focus:ring-2 focus:ring-zen-pinkAccent"
                />
                <p className="mt-2 text-xs text-zen-mauve">Email and account permissions cannot be edited here.</p>
                <div className="mt-4">
                  <p className="mb-2 text-sm font-bold text-zen-plum">Choose your animal avatar</p>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {animalAvatars.map((avatar) => (
                      <button
                        key={avatar.key}
                        type="button"
                        aria-label={avatar.label}
                        aria-pressed={avatarKey === avatar.key}
                        onClick={() => setAvatarKey(avatar.key)}
                        className={`rounded-xl border p-2 text-2xl transition ${
                          avatarKey === avatar.key
                            ? 'border-zen-plum bg-[#FCEBEF] ring-2 ring-zen-pinkAccent'
                            : 'border-zen-pinkAccent/30 bg-[#FFF9F5] hover:bg-[#FFF0F4]'
                        }`}
                      >
                        <img src={avatar.image} alt="" className="mx-auto h-12 w-12 object-contain" />
                        <span className="mt-1 block text-[10px] font-semibold text-zen-plum">{avatar.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
<div className="mt-4">
                  <p className="mb-2 text-sm font-bold text-zen-plum">How are you feeling today?</p>
                  <p className="mb-2 text-xs text-zen-mauve">Optional — you can skip this or change it anytime.</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {moods.map((mood) => (
                      <button
                        key={mood.value}
                        type="button"
                        aria-pressed={dailyMood === mood.value}
                        onClick={() => setDailyMood(dailyMood === mood.value ? '' : mood.value)}
                        className={`rounded-xl border p-2 transition ${
                          dailyMood === mood.value
                            ? 'border-zen-plum bg-[#FCEBEF] ring-2 ring-zen-pinkAccent'
                            : 'border-zen-pinkAccent/30 bg-[#FFF9F5] hover:bg-[#FFF0F4]'
                        }`}
                      >
                        <img src={mood.image} alt="" className="mx-auto h-12 w-12 object-contain" />
                        <span className="mt-1 block text-xs font-semibold text-zen-plum">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={savingProfile}
                    onClick={saveProfileName}
                    className="flex items-center gap-2 rounded-full bg-zen-plum px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    {savingProfile ? 'Saving…' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-zen-plum"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
                {profileMessage && <p role="status" className="mt-3 text-sm text-zen-plum">{profileMessage}</p>}
              </div>
            )}
            {!editing && profileMessage && <p role="status" className="mt-2 text-sm text-zen-plum">{profileMessage}</p>}
          </div>

          <div className="p-6 sm:p-10 space-y-4">
{[
              { label: 'Name', value: name, Icon: UserRound },
              { label: 'Email', value: email, Icon: Mail },
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

        <section className="rounded-[2rem] border border-zen-pinkAccent/30 bg-white/95 p-6 sm:p-8 shadow-zen-lg min-w-0">
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
    </div>
  );
}
