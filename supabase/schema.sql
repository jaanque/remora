-- ==============================================================================
-- REMORA - Script SQL para inicializar perfiles y autenticación en Supabase
-- ==============================================================================
-- Ejecuta este script en el editor SQL de Supabase (Dashboard -> SQL Editor -> New Query)

-- 1. Crear tabla de perfiles vinculada a auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar Row Level Security (RLS) en la tabla profiles
alter table public.profiles enable row level security;

-- 3. Crear políticas de seguridad RLS
-- Permitir que cualquier usuario autenticado pueda leer perfiles
create policy "Los perfiles pueden ser leídos por usuarios autenticados"
  on public.profiles
  for select
  to authenticated
  using (true);

-- Permitir que cada usuario solo pueda actualizar su propio perfil
create policy "Los usuarios pueden actualizar su propio perfil"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 4. Crear función para insertar el perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    updated_at = timezone('utc'::text, now());

  return new;
end;
$$;

-- 5. Crear el Trigger que se activa tras registrarse en auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

