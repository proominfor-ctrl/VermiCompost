alter table orders enable row level security;
alter table store_settings enable row level security;

create policy if not exists "Allow public order insert"
on orders
for insert
with check (true);

create policy if not exists "Allow public order read"
on orders
for select
using (true);

create policy if not exists "Allow public order update"
on orders
for update
using (true)
with check (true);

create policy if not exists "Allow public order delete"
on orders
for delete
using (true);

create policy if not exists "Allow public settings read"
on store_settings
for select
using (true);

create policy if not exists "Allow public settings update"
on store_settings
for update
using (true)
with check (true);
