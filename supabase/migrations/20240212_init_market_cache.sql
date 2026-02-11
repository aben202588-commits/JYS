-- Create market_cache table
create table if not exists market_cache (
  id text primary key, -- Format: module:symbol (e.g., spot:BTC-USDT)
  module_type text not null, -- e.g., spot, swap, forex
  symbol text not null, -- e.g., BTC-USDT
  display_name text, -- e.g., Bitcoin
  last_price numeric,
  change_24h numeric,
  updated_at timestamptz default now()
);

-- Enable Row Level Security (RLS) - Optional but recommended
alter table market_cache enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on market_cache
  for select
  using (true);

-- Create policy to allow service role write access (for adapter)
create policy "Allow service role write access"
  on market_cache
  for all
  using (true)
  with check (true);

-- Enable Realtime for this table
alter publication supabase_realtime add table market_cache;
