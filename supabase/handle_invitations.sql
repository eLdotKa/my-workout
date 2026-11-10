create schema mw_invitation_data;
revoke all on schema mw_invitation_data from public, anon, authenticated;
create table mw_invitation_data.handles (
  user_id uuid primary key references public.mw_profiles(user_id) on delete cascade,
  handle text unique check (handle ~ '^[a-z0-9_]{3,24}$')
);
create table mw_invitation_data.requests (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.mw_groups(id) on delete cascade,
  recipient uuid not null references public.mw_profiles(user_id) on delete cascade,
  sent_at timestamptz not null default now(),
  status text not null default 'pending' check(status in ('pending','accepted','declined')),
  unique(group_id,recipient)
);
create index on mw_invitation_data.requests(recipient,status);

create function public.mw_set_invite_handle(p_handle text) returns void
language plpgsql security definer set search_path='' as $$
declare normalized text := nullif(lower(ltrim(btrim(p_handle),'@')),'');
begin
  if auth.uid() is null then raise exception 'Sign in required'; end if;
  if normalized is not null and normalized !~ '^[a-z0-9_]{3,24}$' then raise exception 'Invalid handle'; end if;
  insert into mw_invitation_data.handles(user_id,handle) values(auth.uid(),normalized)
    on conflict(user_id) do update set handle=excluded.handle;
end $$;

create function public.mw_my_invite_handle() returns text
language sql stable security definer set search_path='' as $$
  select handle from mw_invitation_data.handles where user_id=auth.uid()
$$;

create function public.mw_invite_by_handle(p_group uuid,p_handle text) returns void
language plpgsql security definer set search_path='' as $$
begin
  if not exists(select 1 from public.mw_groups where id=p_group and owner_id=auth.uid()) then
    raise exception 'Group owner required';
  end if;
  insert into mw_invitation_data.requests(group_id,recipient)
    select p_group,h.user_id from mw_invitation_data.handles h
    where h.handle=lower(ltrim(btrim(p_handle),'@'))
      and not exists(select 1 from public.mw_members m where m.group_id=p_group and m.user_id=h.user_id)
    on conflict(group_id,recipient) do update set sent_at=now(),status='pending'
    where mw_invitation_data.requests.sent_at < now()-interval '7 days';
end $$;

create function public.mw_my_invitations() returns table(invite_id uuid,group_name text,inviter_name text)
language sql stable security definer set search_path='' as $$
  select r.id,g.name,p.nickname from mw_invitation_data.requests r
  join public.mw_groups g on g.id=r.group_id
  left join public.mw_profiles p on p.user_id=g.owner_id
  where r.recipient=auth.uid() and r.status='pending' and r.sent_at>now()-interval '7 days'
  order by r.sent_at desc
$$;

create function public.mw_answer_invitation(p_id uuid,p_accept boolean) returns uuid
language plpgsql security definer set search_path='' as $$
declare gid uuid;
begin
  update mw_invitation_data.requests set status=case when p_accept then 'accepted' else 'declined' end
    where id=p_id and recipient=auth.uid() and status='pending' and sent_at>now()-interval '7 days'
    returning group_id into gid;
  if gid is null then raise exception 'Invitation unavailable'; end if;
  if p_accept then
    insert into public.mw_members(group_id,user_id,role) values(gid,auth.uid(),'member') on conflict do nothing;
    return gid;
  end if;
  return null;
end $$;
revoke all on function public.mw_set_invite_handle(text) from public,anon,authenticated;
grant execute on function public.mw_set_invite_handle(text) to authenticated;
revoke all on function public.mw_my_invite_handle() from public,anon,authenticated;
grant execute on function public.mw_my_invite_handle() to authenticated;
revoke all on function public.mw_invite_by_handle(uuid,text) from public,anon,authenticated;
grant execute on function public.mw_invite_by_handle(uuid,text) to authenticated;
revoke all on function public.mw_my_invitations() from public,anon,authenticated;
grant execute on function public.mw_my_invitations() to authenticated;
revoke all on function public.mw_answer_invitation(uuid,boolean) from public,anon,authenticated;
grant execute on function public.mw_answer_invitation(uuid,boolean) to authenticated;
