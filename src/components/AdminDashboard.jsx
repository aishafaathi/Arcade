import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft,
  BarChart3,
  Gamepad2,
  Image,
  ShieldCheck,
  Users,
} from 'lucide-react';

export function AdminDashboard({
  onBackToArcade,
  stats = {
    totalUsers: 0,
    activeUsers: 0,
    totalGames: 0,
    progressRecords: 0,
  },
}) {
  const [liveStats, setLiveStats] = useState(stats);
  const [profiles, setProfiles] = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadAdminStats() {
      const { data, error } = await supabase.rpc(
        'get_admin_dashboard_stats'
      );

      if (!mounted) return;

      if (error) {
        console.error('ADMIN STATS LOAD FAILED', error);
        return;
      }

      setLiveStats((current) => ({
        ...current,
        totalUsers: Number(data?.total_users ?? 0),
        activeUsers: Number(data?.active_users ?? 0),
        totalGames: Number(data?.total_games ?? 0),
      }));
    }

    loadAdminStats();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadProfiles() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, role, is_active, created_at')
        .order('created_at', { ascending: false });

      if (!mounted) return;

      if (error) {
        console.error('ADMIN PROFILES LOAD FAILED', error);
        return;
      }

      setProfiles(data ?? []);
    }

    loadProfiles();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadGames() {
      const { data, error } = await supabase
        .from('games')
        .select('id, name, slug, is_active')
        .order('id', { ascending: true });

      if (!mounted) return;

      if (error) {
        console.error('ADMIN GAMES LOAD FAILED', error);
        return;
      }

      setGames(data ?? []);
    }

    loadGames();

    return () => {
      mounted = false;
    };
  }, []);

  async function toggleUserActive(profile) {
    setUpdatingUserId(profile.id);

    const { error } = await supabase.rpc('set_user_active', {
      target_user_id: profile.id,
      new_active: !profile.is_active,
    });

    if (error) {
      console.error('ADMIN USER STATUS UPDATE FAILED', error);
      setUpdatingUserId(null);
      return;
    }

    setProfiles((current) =>
      current.map((item) =>
        item.id === profile.id
          ? { ...item, is_active: !item.is_active }
          : item
      )
    );

    setUpdatingUserId(null);
  }

  const statCards = [
    {
      label: 'Total Users',
      value: liveStats.totalUsers,
      icon: Users,
      bg: 'bg-[#FCEBEF]',
      border: 'border-zen-pinkAccent/40',
    },
    {
      label: 'Active Users',
      value: liveStats.activeUsers,
      icon: ShieldCheck,
      bg: 'bg-[#E8F7F5]',
      border: 'border-zen-teal/30',
    },
    {
      label: 'Games',
      value: liveStats.totalGames,
      icon: Gamepad2,
      bg: 'bg-[#FFF7D6]',
      border: 'border-zen-yellow',
    },
    {
      label: 'Progress Records',
      value: stats.progressRecords,
      icon: BarChart3,
      bg: 'bg-[#F3F0FF]',
      border: 'border-indigo-200',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zen-pinkAccent/40 text-zen-plum text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Area</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zen-plum font-display">
            Admin Dashboard
          </h2>

          <p className="text-sm text-zen-mauve mt-1">
            Manage users, games, progress, and platform resources.
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToArcade}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zen-plum hover:bg-zen-plumHover text-white font-bold text-xs shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Arcade
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className={`rounded-3xl p-5 border ${card.border} ${card.bg} shadow-zen`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-zen-mauve uppercase tracking-wider">
                    {card.label}
                  </p>

                  <p className="text-3xl font-extrabold text-zen-plum mt-2">
                    {card.value}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-2xl bg-white/70 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-zen-plum" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-3xl bg-white/80 border border-zen-pinkAccent/40 shadow-zen p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-zen-pinkHeader flex items-center justify-center">
              <Users className="w-5 h-5 text-zen-plum" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-zen-plum font-display">
                User Management
              </h3>

              <p className="text-xs text-zen-mauve">
                View and manage player accounts.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-[#FFF8FA] p-4">
            {profiles.length === 0 ? (
              <p className="text-sm text-zen-mauve">
                No user profiles found yet.
              </p>
            ) : (
              <div className="space-y-3">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/80 border border-black/5 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-zen-plum truncate">
                        {profile.name || 'Unnamed User'}
                      </p>

                      <p className="text-[11px] text-zen-mauve">
                        {profile.role || 'player'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleUserActive(profile)}
                      disabled={updatingUserId === profile.id}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        profile.is_active
                          ? 'bg-zen-tealBg text-zen-teal hover:opacity-80'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      } ${
                        updatingUserId === profile.id
                          ? 'opacity-50 cursor-wait'
                          : ''
                      }`}
                    >
                      {updatingUserId === profile.id
                        ? 'Saving...'
                        : profile.is_active
                          ? 'Active'
                          : 'Inactive'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl bg-white/80 border border-zen-olive/20 shadow-zen p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-zen-oliveBg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-zen-olive" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-zen-plum font-display">
                Game Management
              </h3>

              <p className="text-xs text-zen-mauve">
                Review the games available in the arcade.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-[#F6F8EC] p-4">
            <div className="mb-3">
              <p className="text-sm font-semibold text-zen-plum">
                {games.length} games found
              </p>
              <p className="text-xs text-zen-mauve">
                Games are being read from the Supabase games table.
              </p>
            </div>

            {games.length > 0 ? (
              <div className="space-y-2">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/80 border border-black/5 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-zen-plum truncate">
                        {game.name}
                      </p>
                      <p className="text-[11px] text-zen-mauve">
                        {game.slug}
                      </p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        game.is_active
                          ? 'bg-zen-tealBg text-zen-teal'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {game.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zen-mauve">
                No games found.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-3xl bg-white/80 border border-indigo-200 shadow-zen p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-[#F3F0FF] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-indigo-700" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-zen-plum font-display">
                Game Progress
              </h3>

              <p className="text-xs text-zen-mauve">
                Progress data overview.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-[#FAF8FF] p-5">
            <p className="text-sm font-semibold text-zen-plum">
              Progress integration will be connected later.
            </p>

            <p className="text-xs text-zen-mauve mt-2 leading-relaxed">
              We are intentionally leaving game-progress integration until
              all game structures have been reviewed.
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-white/80 border border-zen-yellow shadow-zen p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-zen-yellow/50 flex items-center justify-center">
              <Image className="w-5 h-5 text-zen-plum" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-zen-plum font-display">
                Image Storage
              </h3>

              <p className="text-xs text-zen-mauve">
                User image storage and resources.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-[#FFFBE8] p-5">
            <p className="text-sm font-semibold text-zen-plum">
              Image bucket is configured.
            </p>

            <p className="text-xs text-zen-mauve mt-2 leading-relaxed">
              The existing Supabase user-images bucket will be connected here
              when we wire the dashboard to the backend.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
