-- Fix RLS policies to ensure admins can always view all data
-- First, let's make sure the current user gets admin access
-- We'll use the ranger user_id as the admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('26c26841-0fcc-4c64-abd0-a3d38d8e56d5', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
VALUES ('4ad065c2-2aaa-4c64-af9f-c63ae55c0976', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Add unique constraint to prevent duplicate role assignments
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_user_id_role_key;
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);