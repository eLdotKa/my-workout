-- 004: Browser Web Push subscriptions and per-group notification preferences.
-- Run AFTER 001_private_forum.sql and 002_fix_profile_permissions.sql.
-- Safe to run again. No existing workout or forum data is deleted.
begin;

create table if not exists public.mw_push_subscriptions (
  endpoint text primary key check (char_length(endpoint) between 16 and 2048),
  user_id uuid not null references auth.users(id) on delete cascade,
  p256dh text not null check (char_length(p256dh) between 20 and 300),
  auth text not null check (char_length(auth) between 10 and 200),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists mw_push_subscriptions_user
  on public.mw_push_subscriptions (user_id);
alter table public.mw_push_subscriptions enable row level security;
revoke all on public.mw_push_subscriptions from public, anon, authenticated;
grant select,insert,update,delete on public.mw_push_subscriptions to authenticated;
drop policy if exists "mw_push_own_select" on public.mw_push_subscriptions;
create policy "mw_push_own_select" on public.mw_push_subscriptions
  for select to authenticated using (user_id=(select auth.uid()));
drop policy if exists "mw_push_own_insert" on public.mw_push_subscriptions;
create policy "mw_push_own_insert" on public.mw_push_subscriptions
  for insert to authenticated with check (user_id=(select auth.uid()));
drop policy if exists "mw_push_own_update" on public.mw_push_subscriptions;
create policy "mw_push_own_update" on public.mw_push_subscriptions
  for update to authenticated using (user_id=(select auth.uid()))
  with check (user_id=(select auth.uid()));
drop policy if exists "mw_push_own_delete" on public.mw_push_subscriptions;
create policy "mw_push_own_delete" on public.mw_push_subscriptions
  for delete to authenticated using (user_id=(select auth.uid()));

create table if not exists public.mw_group_notification_prefs (
  user_id uuid not null references auth.users(id) on delete cascade,
  group_id uuid not null references public.mw_groups(id) on delete cascade,
  messages_enabled boolean not null default true,
  mute_until timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id,group_id)
);
create index if not exists mw_group_notification_group
  on public.mw_group_notification_prefs (group_id);
alter table public.mw_group_notification_prefs enable row level security;
revoke all on public.mw_group_notification_prefs from public,anon,authenticated;
grant select,insert,update,delete on public.mw_group_notification_prefs to authenticated;
drop policy if exists "mw_group_prefs_select" on public.mw_group_notification_prefs;
create policy "mw_group_prefs_select" on public.mw_group_notification_prefs
  for select to authenticated
  using (user_id=(select auth.uid()) and public.mw_is_member(group_id));
drop policy if exists "mw_group_prefs_insert" on public.mw_group_notification_prefs;
create policy "mw_group_prefs_insert" on public.mw_group_notification_prefs
  for insert to authenticated
  with check (user_id=(select auth.uid()) and public.mw_is_member(group_id));
drop policy if exists "mw_group_prefs_update" on public.mw_group_notification_prefs;
create policy "mw_group_prefs_update" on public.mw_group_notification_prefs
  for update to authenticated
  using (user_id=(select auth.uid()) and public.mw_is_member(group_id))
  with check (user_id=(select auth.uid()) and public.mw_is_member(group_id));
drop policy if exists "mw_group_prefs_delete" on public.mw_group_notification_prefs;
create policy "mw_group_prefs_delete" on public.mw_group_notification_prefs
  for delete to authenticated
  using (user_id=(select auth.uid()) and public.mw_is_member(group_id));

commit;

-- SECURITY: Only use an authenticated service-to-service webhook for mw_messages INSERT.
-- DO NOT add a trigger without protecting its Edge Function with a secret.
