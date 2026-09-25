create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password text not null,
  role text not null default 'teacher' check (role in ('admin', 'teacher')),
  created_at timestamptz not null default now()
);

create table if not exists professor_topics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  topic_1 text,
  topic_2 text,
  topic_3 text,
  topic_4 text,
  topic_5 text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint professor_topics_user_unique unique (user_id)
);

insert into app_users (username, password, role)
values ('admin', 'admin123', 'admin')
on conflict (username) do nothing;

alter table app_users enable row level security;
alter table professor_topics enable row level security;

create policy "Allow prototype reads for app users"
on app_users for select
to anon
using (true);

create policy "Allow prototype user creation"
on app_users for insert
to anon
with check (true);

create policy "Allow prototype topics reads"
on professor_topics for select
to anon
using (true);

create policy "Allow prototype topics inserts"
on professor_topics for insert
to anon
with check (true);

create policy "Allow prototype topics updates"
on professor_topics for update
to anon
using (true)
with check (true);
