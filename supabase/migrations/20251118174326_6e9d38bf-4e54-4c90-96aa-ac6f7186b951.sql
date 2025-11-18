-- Create pending admin approvals table
CREATE TABLE IF NOT EXISTS public.pending_admin_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  requested_at timestamp with time zone DEFAULT now(),
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamp with time zone,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pending_admin_approvals ENABLE ROW LEVEL SECURITY;

-- Admins can view all pending approvals
CREATE POLICY "Admins can view all approvals"
ON public.pending_admin_approvals
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Admins can update approvals
CREATE POLICY "Admins can update approvals"
ON public.pending_admin_approvals
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Users can insert their own approval request
CREATE POLICY "Users can request admin approval"
ON public.pending_admin_approvals
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_pending_approvals_status ON public.pending_admin_approvals(status);
CREATE INDEX IF NOT EXISTS idx_pending_approvals_user_id ON public.pending_admin_approvals(user_id);