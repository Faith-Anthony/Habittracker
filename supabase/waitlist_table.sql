-- Run this in your Supabase SQL editor to create the waitlist table
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  created_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.waitlist enable row level security;

-- Allow anyone to insert (public waitlist signup)
create policy "Anyone can join waitlist"
  on public.waitlist
  for insert
  with check (true);

-- Only authenticated service role can read
create policy "Only service role can read waitlist"
  on public.waitlist
  for select
  using (auth.role() = 'service_role');
