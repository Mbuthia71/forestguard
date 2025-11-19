-- Create admin messages table
CREATE TABLE public.admin_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID NOT NULL,
  message_text TEXT NOT NULL,
  channel TEXT DEFAULT 'general' NOT NULL
);

-- Enable RLS
ALTER TABLE public.admin_messages ENABLE ROW LEVEL SECURITY;

-- Admins can view all messages
CREATE POLICY "Admins can view all messages"
ON public.admin_messages
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can create messages
CREATE POLICY "Admins can create messages"
ON public.admin_messages
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid());

-- Admins can delete their own messages
CREATE POLICY "Admins can delete own messages"
ON public.admin_messages
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid());