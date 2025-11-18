-- Add action status tracking to alerts, reports, and messages for blockchain traceability

-- Add action_status enum
CREATE TYPE public.action_status AS ENUM ('received', 'under_review', 'in_progress', 'resolved', 'ignored');

-- Add action_status and admin response tracking to alerts
ALTER TABLE public.alerts 
ADD COLUMN action_status public.action_status DEFAULT 'received',
ADD COLUMN action_taken_by uuid REFERENCES auth.users(id),
ADD COLUMN action_notes text,
ADD COLUMN action_timestamp timestamptz;

-- Add action_status to blockchain_reports
ALTER TABLE public.blockchain_reports 
ADD COLUMN action_status public.action_status DEFAULT 'received',
ADD COLUMN action_taken_by uuid REFERENCES auth.users(id),
ADD COLUMN action_notes text,
ADD COLUMN action_timestamp timestamptz;

-- Add action_status to contact_messages
ALTER TABLE public.contact_messages 
ADD COLUMN action_status public.action_status DEFAULT 'received',
ADD COLUMN action_taken_by uuid REFERENCES auth.users(id),
ADD COLUMN action_notes text,
ADD COLUMN action_timestamp timestamptz;

-- Create index for status filtering
CREATE INDEX idx_alerts_action_status ON public.alerts(action_status);
CREATE INDEX idx_blockchain_reports_action_status ON public.blockchain_reports(action_status);
CREATE INDEX idx_contact_messages_action_status ON public.contact_messages(action_status);

-- Update RLS policies to allow admins to update action status
CREATE POLICY "Admins can update alert action status"
ON public.alerts
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update report action status"
ON public.blockchain_reports
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));