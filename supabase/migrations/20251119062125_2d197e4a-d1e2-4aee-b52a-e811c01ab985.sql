-- Function to automatically create a ranger profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_ranger_user()
RETURNS TRIGGER
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
    VALUES (NEW.id, 'active', NEW.raw_user_meta_data->>'phone')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to auto-create ranger profiles after profile creation
DROP TRIGGER IF EXISTS on_profile_created_create_ranger ON public.profiles;
CREATE TRIGGER on_profile_created_create_ranger
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_ranger_user();