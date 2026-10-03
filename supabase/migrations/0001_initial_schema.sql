-- Supabase constraint migration
-- Generated from the uploaded Supabase constraint export

begin;

-- admin_settings
alter table public.admin_settings
  add constraint "2200_17565_1_not_null" check (id is not null),
  add constraint "2200_17565_2_not_null" check (passcode_hash is not null),
  add constraint "2200_17565_3_not_null" check (is_active is not null),
  add constraint "2200_17565_4_not_null" check (created_at is not null),
  add constraint "2200_17565_5_not_null" check (updated_at is not null);

-- game_progress
alter table public.game_progress
  add constraint "2200_17520_1_not_null" check (id is not null),
  add constraint "2200_17520_2_not_null" check (user_id is not null),
  add constraint "2200_17520_3_not_null" check (game_id is not null),
  add constraint "2200_17520_4_not_null" check (progress_data is not null),
  add constraint "2200_17520_5_not_null" check (score is not null),
  add constraint "2200_17520_6_not_null" check (level is not null),
  add constraint "2200_17520_7_not_null" check (status is not null),
  add constraint "2200_17520_8_not_null" check (created_at is not null),
  add constraint "2200_17520_9_not_null" check (updated_at is not null),
  add constraint "game_progress_status_check"
    check (status = any (array[
      'not_started'::text,
      'playing'::text,
      'completed'::text
    ]));

-- games
alter table public.games
  add constraint "2200_17507_1_not_null" check (id is not null),
  add constraint "2200_17507_2_not_null" check (name is not null),
  add constraint "2200_17507_3_not_null" check (slug is not null),
  add constraint "2200_17507_5_not_null" check (is_active is not null),
  add constraint "2200_17507_6_not_null" check (created_at is not null),
  add constraint "2200_17507_7_not_null" check (updated_at is not null);

-- profiles
alter table public.profiles
  add constraint "2200_17485_1_not_null" check (id is not null),
  add constraint "2200_17485_3_not_null" check (role is not null),
  add constraint "2200_17485_4_not_null" check (is_active is not null),
  add constraint "2200_17485_5_not_null" check (created_at is not null),
  add constraint "2200_17485_6_not_null" check (updated_at is not null),
  add constraint "profiles_role_check"
    check (role = any (array[
      'player'::text,
      'admin'::text
    ]));

-- user_rules
alter table public.user_rules
  add constraint "2200_17596_1_not_null" check (id is not null),
  add constraint "2200_17596_2_not_null" check (user_id is not null),
  add constraint "2200_17596_3_not_null" check (rule_name is not null),
  add constraint "2200_17596_4_not_null" check (rule_value is not null),
  add constraint "2200_17596_5_not_null" check (is_active is not null),
  add constraint "2200_17596_6_not_null" check (created_at is not null),
  add constraint "2200_17596_7_not_null" check (updated_at is not null);

commit;