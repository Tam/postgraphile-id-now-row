drop table if exists public.block_item cascade;
drop table if exists public.block cascade;

create extension if not exists "uuid-ossp";

create table if not exists public.block (
  id uuid primary key default public.uuid_generate_v4()
, name varchar
);

create table if not exists public.block_item (
  id uuid primary key references public.block (id) on delete cascade
, amount int
);

do $$ begin
  insert into public.block (id, name)
  values ('5df56024-61c7-4172-a2ac-6cc3583760f6', 'Example');

  insert into public.block_item (id, amount)
  values ('5df56024-61c7-4172-a2ac-6cc3583760f6', 10);
exception when duplicate_object then end $$;
