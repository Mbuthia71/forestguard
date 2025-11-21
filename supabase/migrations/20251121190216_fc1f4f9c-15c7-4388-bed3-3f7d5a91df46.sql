-- Fix Security Issues: Restrict Public Access to Sensitive Data

-- 1. Fix blockchain_reports - Remove public read access
DROP POLICY IF EXISTS "Allow public read access to blockchain reports" ON public.blockchain_reports;

-- Admins can already view all reports (existing policy)
-- Add rangers can view reports
CREATE POLICY "Rangers can view blockchain reports"
ON public.blockchain_reports
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.rangers
    WHERE rangers.user_id = auth.uid()
  )
);

-- 2. Fix alerts - Remove public read access
DROP POLICY IF EXISTS "Allow public read access to alerts" ON public.alerts;

-- Add policy for rangers to view alerts
CREATE POLICY "Rangers can view alerts"
ON public.alerts
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.rangers
    WHERE rangers.user_id = auth.uid()
  )
);

-- 3. Fix sensor_data - Remove public read access, restrict insert
DROP POLICY IF EXISTS "Allow public read access to sensor data" ON public.sensor_data;
DROP POLICY IF EXISTS "Allow public insert to sensor data" ON public.sensor_data;

-- Add admin read policy
CREATE POLICY "Admins can view sensor data"
ON public.sensor_data
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add ranger read policy
CREATE POLICY "Rangers can view sensor data"
ON public.sensor_data
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.rangers
    WHERE rangers.user_id = auth.uid()
  )
);

-- Add authenticated insert for IoT devices (requires auth)
CREATE POLICY "Authenticated users can insert sensor data"
ON public.sensor_data
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- 4. Contact messages - Already restricted to admins only, this is acceptable
-- The admin role is necessary to review contact submissions

-- 5. Rangers table - Already has proper restrictions
-- Only rangers can view their own profile, admins can manage all