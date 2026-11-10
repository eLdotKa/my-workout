-- My Workout: private Friends Forum (phase 1)
-- To execute once in Supabase Dashboard > SQL Editor.
-- Data is PRIVATE by default. Only signed-in members of a group can read its messages.
-- This file does not send push notifications or connect the app on its own.

begin;

create table if not exists public.mw_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 60),
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.mw_members (
  group_id uuid not null references public.mw_groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','member')),
  joined_at timestamptz not null default now(),
  primary key (group_id,user_id)
);

create index if not exists mw_members_by_user on public.mw_members (user_id,group_id);

create table if not exists public.mw_invites (
  token uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.mw_groups(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days'),
  uses_remaining integer not null default 10 check (uses_remaining between 0 and 100)
);

create index if not exists mw_invites_group_id_idx on public.mw_invites (group_id);

create table if not exists public.mw_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null check (char_length(btrim(nickname)) between 1 and 40),
  created_at timestamptz not null default now()
);

create table if not exists public.mw_messages (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.mw_groups(id) on delete cascade,
  thread_key text not null check (thread_key = 'general' or thread_key ~ '^w([1-9]|1[0-2])d[1-4]$'),
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists mw_messages_thread_newest
  on public.mw_messages (group_id, thread_key, created_at desc);
create index if not exists mw_messages_author_idx
  on public.mw_messages (author_id);

create table if not exists public.mw_notification_prefs (
  user_id uuid primary key references auth.users(id) on delete cascade,
  messages_enabled boolean not null default true,
  mute_until timestamptz,
  updated_at timestamptz not null default now()
);

-- Even if automatic RLS was disabled during project creation, the SQL enables it.
alter table public.mw_groups enable row level security;
alter table public.mw_members enable row level security;
alter table public.mw_invites enable row level security;
alter table public.mw_profiles enable row level security;
alter table public.mw_messages enable row level security;
alter table public.mw_notification_prefs enable row level security;

-- Restrict client grants explicitly, irrespective of dashboard defaults.
revoke all on table
  public.mw_groups,public.mw_members,public.mw_invites,
  public.mw_profiles,public.mw_messages,public.mw_notification_prefs
  from public,anon,authenticated;

grant select on public.mw_groups to authenticated;
grant select on public.mw_members to authenticated;
grant select on public.mw_profiles to authenticated;
grant insert (user_id,nickname) on public.mw_profiles to authenticated;
grant update (nickname) on public.mw_profiles to authenticated;
grant select,delete on public.mw_messages to authenticated;
grant insert (group_id,thread_key,author_id,body) on public.mw_messages to authenticated;
grant select on public.mw_notification_prefs to authenticated;
grant insert (user_id,messages_enabled,mute_until) on public.mw_notification_prefs to authenticated;
grant update (messages_enabled,mute_until) on public.mw_notification_prefs to authenticated;

-- SECURITY DEFINER is used only for checking memberships and guarded group/invite operations.
-- All object names are schema-qualified; empty search_path blocks unsafe name resolution.
create or replace function public.mw_is_member(p_group uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.mw_members
    where group_id=p_group and user_id=(select auth.uid())
  );
$$;

revoke all on function public.mw_is_member(uuid) from public,anon;
grant execute on function public.mw_is_member(uuid) to authenticated;

drop policy if exists "mw_groups_select" on public.mw_groups;
create policy "mw_groups_select" on public.mw_groups
  for select to authenticated using (public.mw_is_member(id));

drop policy if exists "mw_members_select" on public.mw_members;
create policy "mw_members_select" on public.mw_members
  for select to authenticated using (public.mw_is_member(group_id));

drop policy if exists "mw_profiles_select" on public.mw_profiles;
create policy "mw_profiles_select" on public.mw_profiles
  for select to authenticated
  using (
    user_id=(select auth.uid())
    or exists (
      select 1 from public.mw_members gm
      where gm.user_id=mw_profiles.user_id
      and public.mw_is_member(gm.group_id)
    )
  );

drop policy if exists "mw_profiles_insert" on public.mw_profiles;
create policy "mw_profiles_insert" on public.mw_profiles
  for insert to authenticated with check (user_id=(select auth.uid()));

drop policy if exists "mw_profiles_update" on public.mw_profiles;
create policy "mw_profiles_update" on public.mw_profiles
  for update to authenticated
  using (user_id=(select auth.uid()))
  with check (user_id=(select auth.uid()));

drop policy if exists "mw_messages_select" on public.mw_messages;
create policy "mw_messages_select" on public.mw_messages
  for select to authenticated using (public.mw_is_member(group_id));

drop policy if exists "mw_messages_insert" on public.mw_messages;
create policy "mw_messages_insert" on public.mw_messages
  for insert to authenticated
  with check (
    author_id=(select auth.uid())
    and public.mw_is_member(group_id)
  );

drop policy if exists "mw_messages_delete" on public.mw_messages;
create policy "mw_messages_delete" on public.mw_messages
  for delete to authenticated
  using (author_id=(select auth.uid()) and public.mw_is_member(group_id));

drop policy if exists "mw_notify_select" on public.mw_notification_prefs;
create policy "mw_notify_select" on public.mw_notification_prefs
  for select to authenticated using (user_id=(select auth.uid()));

drop policy if exists "mw_notify_insert" on public.mw_notification_prefs;
create policy "mw_notify_insert" on public.mw_notification_prefs
  for insert to authenticated with check (user_id=(select auth.uid()));

drop policy if exists "mw_notify_update" on public.mw_notification_prefs;
create policy "mw_notify_update" on public.mw_notification_prefs
  for update to authenticated
  using (user_id=(select auth.uid()))
  with check (user_id=(select auth.uid()));

-- A signed-in user may create a private group. They automatically become its owner.
create or replace function public.mw_create_group(p_name text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_group uuid;
begin
  if v_user is null then raise exception 'Please sign in'; end if;
  if p_name is null or char_length(btrim(p_name)) not between 1 and 60 then
    raise exception 'Invalid group name';
  end if;
  insert into public.mw_groups(name,owner_id)
    values (btrim(p_name),v_user) returning id into v_group;
  insert into public.mw_members(group_id,user_id,role)
    values (v_group,v_user,'owner');
  return v_group;
end;
$$;

-- Owners can issue short-lived invite codes. Invite codes are never publicly readable.
create or replace function public.mw_create_invite(p_group uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_token uuid;
begin
  if v_user is null then raise exception 'Please sign in'; end if;
  if not exists (
    select 1 from public.mw_members
    where group_id=p_group and user_id=v_user and role='owner'
  ) then raise exception 'Only group owners may invite'; end if;
  insert into public.mw_invites(group_id,created_by)
    values (p_group,v_user) returning token into v_token;
  return v_token;
end;
$$;

-- A signed-in user joins only by presenting a valid, unexpired invite token.
create or replace function public.mw_join_group(p_token uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_group uuid;
  v_added uuid;
begin
  if v_user is null then raise exception 'Please sign in'; end if;
  select group_id into v_group from public.mw_invites
    where token=p_token and expires_at>now() and uses_remaining>0
    for update;
  if v_group is null then raise exception 'Invite expired or invalid'; end if;
  insert into public.mw_members(group_id,user_id,role)
    values (v_group,v_user,'member')
    on conflict do nothing returning group_id into v_added;
  if v_added is not null then
    update public.mw_invites
      set uses_remaining=uses_remaining-1
      where token=p_token;
  end if;
  return v_group;
end;
$$;

revoke all on function public.mw_create_group(text) from public,anon;
revoke all on function public.mw_create_invite(uuid) from public,anon;
revoke all on function public.mw_join_group(uuid) from public,anon;
grant execute on function public.mw_create_group(text) to authenticated;
grant execute on function public.mw_create_invite(uuid) to authenticated;
grant execute on function public.mw_join_group(uuid) to authenticated;

-- Enable live INSERT events. RLS is still enforced on receiving clients.
do $$
begin
  if not exists(
    select 1 from pg_publication_tables
    where pubname='supabase_realtime' and schemaname='public'
      and tablename='mw_messages'
  ) then
    alter publication supabase_realtime add table public.mw_messages;
  end if;
end;
$$;

commit;

-- After running, verify these six tables exist in Database > Tables.
-- Setup is not complete until authentication and the frontend are connected.
