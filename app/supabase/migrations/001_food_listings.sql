-- MessMate — Proposed schema for food_listings
-- STATUS: NOT APPLIED. Review and approve before running in Supabase SQL editor.
--
-- This migration is additive only. It does not drop or alter existing tables.
-- After approval, run it in the Supabase SQL Editor of your existing project.

-- Extensions (safe if already enabled)
create extension if not exists "pgcrypto";

-- food_listings table
create table if not exists public.food_listings (
  id uuid primary key default gen_random_uuid(),
  dish_name text not null,
  meal_type text not null check (meal_type in ('breakfast', 'lunch', 'dinner')),
  price_inr integer not null check (price_inr >= 0),
  portions_total integer not null check (portions_total > 0),
  portions_remaining integer not null check (portions_remaining >= 0),
  pickup_start text not null,          -- e.g. '09:00'
  pickup_end text not null,            -- e.g. '10:00'
  pickup_date date,                    -- optional specific date
  allergens text[] default '{}',
  notes text,
  image_url text,
  is_illustrative boolean not null default false,
  is_active boolean not null default true,
  college_id text default 'gec-banka', -- future multi-college
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint portions_remaining_lte_total
    check (portions_remaining <= portions_total)
);

-- Indexes
create index if not exists food_listings_active_idx
  on public.food_listings (is_active, meal_type)
  where is_active = true;

create index if not exists food_listings_college_idx
  on public.food_listings (college_id);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists food_listings_set_updated_at on public.food_listings;
create trigger food_listings_set_updated_at
  before update on public.food_listings
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.food_listings enable row level security;

-- Public read of active listings (customers need no login)
drop policy if exists "Public can read active listings" on public.food_listings;
create policy "Public can read active listings"
  on public.food_listings
  for select
  using (is_active = true);

-- Only authenticated users can insert (mess owner / admin — role checks later)
drop policy if exists "Authenticated can insert listings" on public.food_listings;
create policy "Authenticated can insert listings"
  on public.food_listings
  for insert
  to authenticated
  with check (true);

-- Owners can update their own listings (created_by = auth.uid())
drop policy if exists "Owners can update own listings" on public.food_listings;
create policy "Owners can update own listings"
  on public.food_listings
  for update
  to authenticated
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

-- Comment for documentation
comment on table public.food_listings is
  'Surplus meal listings for MessMate. Public can read active rows; write requires auth.';
