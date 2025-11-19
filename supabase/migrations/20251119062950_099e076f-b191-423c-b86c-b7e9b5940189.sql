-- Create function to check if user is master admin
CREATE OR REPLACE FUNCTION public.is_master_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users u
    WHERE u.id = _user_id 
    AND u.email = 'allan.mbuthia.nganga@gmail.com'
  )
$$;

-- Drop existing policies on pending_admin_approvals
DROP POLICY IF EXISTS "Admins can update approvals" ON public.pending_admin_approvals;
DROP POLICY IF EXISTS "Admins can view all approvals" ON public.pending_admin_approvals;

-- Create new policies that only allow master admin
CREATE POLICY "Master admin can view all approvals"
ON public.pending_admin_approvals
FOR SELECT
USING (public.is_master_admin(auth.uid()));

CREATE POLICY "Master admin can update approvals"
ON public.pending_admin_approvals
FOR UPDATE
USING (public.is_master_admin(auth.uid()))
WITH CHECK (public.is_master_admin(auth.uid()));