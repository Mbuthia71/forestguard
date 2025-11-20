-- Enable realtime for field_reports and ranger_tasks tables
ALTER TABLE public.field_reports REPLICA IDENTITY FULL;
ALTER TABLE public.ranger_tasks REPLICA IDENTITY FULL;

-- Add tables to realtime publication (alerts already exists)
ALTER PUBLICATION supabase_realtime ADD TABLE public.field_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ranger_tasks;