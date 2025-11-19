-- Add missing foreign key for admin_messages only (others already exist)

ALTER TABLE public.admin_messages
ADD CONSTRAINT admin_messages_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE;