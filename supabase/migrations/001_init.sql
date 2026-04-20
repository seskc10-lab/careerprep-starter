create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  stage text,
  target_role text,
  experience_level text,
  biggest_struggle text,
  created_at timestamptz default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  owner_email text,
  company_name text,
  interview_date text,
  cv_text text not null,
  job_description text not null,
  match_score int,
  match_band text,
  summary_verdict text,
  preview_json jsonb,
  full_json jsonb,
  status text not null default 'preview_ready',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists report_unlocks (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references reports(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  payment_status text not null,
  unlocked_at timestamptz,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  stripe_customer_id text,
  created_at timestamptz default now()
);

create table if not exists report_events (
  id uuid primary key default gen_random_uuid(),
  report_id uuid references reports(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  event_type text not null,
  payload jsonb,
  created_at timestamptz default now()
);
