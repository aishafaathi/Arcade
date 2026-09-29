import { supabase } from './supabase';

async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  if (!user) throw new Error('User is not authenticated.');

  return user;
}

export async function getGameProgress(gameId) {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from('game_progress')
    .select(
      'id, game_id, progress_data, score, level, status, created_at, updated_at'
    )
    .eq('user_id', user.id)
    .eq('game_id', gameId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function saveGameProgress({
  gameId,
  progressData = {},
  score = 0,
  level = 1,
  status = 'playing',
}) {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from('game_progress')
    .upsert(
      {
        user_id: user.id,
        game_id: gameId,
        progress_data: progressData,
        score,
        level,
        status,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,game_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function completeGame({
  gameId,
  progressData = {},
  score = 0,
  level = 1,
}) {
  return saveGameProgress({
    gameId,
    progressData,
    score,
    level,
    status: 'completed',
  });
}

export async function startGame({
  gameId,
  progressData = {},
  score = 0,
  level = 1,
}) {
  return saveGameProgress({
    gameId,
    progressData,
    score,
    level,
    status: 'playing',
  });
}
