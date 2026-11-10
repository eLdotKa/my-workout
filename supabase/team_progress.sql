create table public.mw_team_progress (
  group_id uuid not null,
  user_id uuid not null,
  sharing boolean not null default false,
  exercises integer,
  workouts integer,
  primary key (group_id,user_id),
  foreign key (group_id,user_id) references public.mw_members(group_id,user_id) on delete cascade,
  check ((sharing and exercises is not null and workouts is not null and exercises>=0 and workouts>=0)
      or (not sharing and exercises is null and workouts is null))
);
alter table public.mw_team_progress enable row level security;
revoke all on public.mw_team_progress from public,anon,authenticated;
grant select,insert on public.mw_team_progress to authenticated;
grant update(sharing,exercises,workouts) on public.mw_team_progress to authenticated;
create policy team_reads on public.mw_team_progress for select to authenticated using(public.mw_is_member(group_id));
create policy self_inserts on public.mw_team_progress for insert to authenticated with check(user_id=(select auth.uid()) and public.mw_is_member(group_id));
create policy self_updates on public.mw_team_progress for update to authenticated using(user_id=(select auth.uid()) and public.mw_is_member(group_id)) with check(user_id=(select auth.uid()) and public.mw_is_member(group_id));
alter publication supabase_realtime add table public.mw_team_progress;
