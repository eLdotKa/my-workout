-- My Workout: repair 42501 "permission denied for table mw_profiles".
-- Execute in Supabase SQL Editor once, as the project owner.
-- Existing Row Level Security policies stay enabled.
begin;

grant usage on schema public to authenticated;

-- Supabase upsert sends the primary key along with the nickname.
-- It can require UPDATE on user_id too, even when the user_id is unchanged.
grant select, insert, update on table public.mw_profiles to authenticated;

-- Same issue can affect upsert of message-notification preferences.
grant select, insert, update on table public.mw_notification_prefs to authenticated;

-- Keep row-level protection: each user can modify only their own record.
alter table public.mw_profiles enable row level security;
alter table public.mw_notification_prefs enable row level security;

commit;

-- Check the result without exposing users' personal data:
select
  has_table_privilege('authenticated','public.mw_profiles','SELECT') as profiles_read,
  has_table_privilege('authenticated','public.mw_profiles','INSERT') as profiles_create,
  has_table_privilege('authenticated','public.mw_profiles','UPDATE') as profiles_edit,
  has_table_privilege('authenticated','public.mw_notification_prefs','UPDATE') as preferences_edit;
