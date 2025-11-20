-- Add photo_url column to rangers table
ALTER TABLE public.rangers 
ADD COLUMN photo_url TEXT;

-- Create storage bucket for ranger photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('ranger-photos', 'ranger-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for ranger photos
CREATE POLICY "Rangers can upload their own photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'ranger-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view ranger photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'ranger-photos');

CREATE POLICY "Rangers can update their own photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'ranger-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Rangers can delete their own photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'ranger-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);