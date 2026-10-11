create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_phone text not null,
  customer_city text not null,
  customer_address text not null,
  customer_notes text,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric not null default 0,
  shipping_fee numeric not null default 0,
  total_amount numeric not null default 0,
  status text not null default 'new' check (status in ('new','confirmed','shipped','delivered','cancelled'))
);

create table if not exists store_settings (
  id text primary key default 'main',
  owner_whatsapp text default '',
  owner_phone text default '',
  owner_email text default '',
  notify_by_whatsapp boolean default true
);
