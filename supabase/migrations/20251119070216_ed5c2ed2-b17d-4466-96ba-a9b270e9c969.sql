-- Drop all dependent triggers first
DROP TRIGGER IF EXISTS on_profile_created_create_ranger ON profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_ranger_user_created ON auth.users;

-- Now drop the functions with CASCADE
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_ranger_user() CASCADE;

-- Create fixed function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create profile with display_name from metadata if available
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create fixed function to handle new ranger users  
-- This will automatically create ranger entries for non-admin users
CREATE OR REPLACE FUNCTION public.handle_new_ranger_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only create ranger entry if user doesn't have an admin role
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = NEW.id AND role = 'admin'
  ) THEN
    -- Create ranger profile
    INSERT INTO public.rangers (user_id, status, phone)
    VALUES (
      NEW.id, 
      'active', 
      NEW.raw_user_meta_data->>'phone'
    )
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Recreate triggers on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_ranger_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_ranger_user();