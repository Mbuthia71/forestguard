-- Create Sensors_Kenya table
CREATE TABLE IF NOT EXISTS public.sensors_kenya (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  forest_name text NOT NULL,
  gps_location text NOT NULL,
  sensor_type text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  last_seen timestamp with time zone DEFAULT now(),
  battery_level integer,
  zone_name text NOT NULL,
  purpose text NOT NULL,
  latitude numeric,
  longitude numeric,
  created_at timestamp with time zone DEFAULT now()
);

-- Create ForestAlerts_Kenya table
CREATE TABLE IF NOT EXISTS public.forest_alerts_kenya (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sensor_id uuid REFERENCES public.sensors_kenya(id),
  alert_type text NOT NULL,
  location text NOT NULL,
  confidence_score numeric,
  timestamp timestamp with time zone DEFAULT now(),
  description text NOT NULL,
  evidence_image_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sensors_kenya ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forest_alerts_kenya ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read access to sensors_kenya"
ON public.sensors_kenya FOR SELECT
USING (true);

CREATE POLICY "Allow public read access to forest_alerts_kenya"
ON public.forest_alerts_kenya FOR SELECT
USING (true);

-- Insert sample Kenyan sensor data
INSERT INTO public.sensors_kenya (forest_name, gps_location, sensor_type, status, battery_level, zone_name, purpose, latitude, longitude) VALUES
('Kakamega Forest', '0.2827°N, 34.8540°E', 'Acoustic', 'active', 87, 'Isecheno Station', 'Illegal logging detection', 0.2827, 34.8540),
('Kakamega Forest', '0.3161°N, 34.8547°E', 'Motion', 'active', 92, 'Buyangu Area', 'Wildlife tracking', 0.3161, 34.8547),
('Kakamega Forest', '0.2956°N, 34.8320°E', 'Smoke', 'active', 78, 'Yala River Zone', 'Fire detection', 0.2956, 34.8320),
('Mau Forest', '-0.4500°N, 35.5833°E', 'Acoustic', 'active', 65, 'Kiptunga Area', 'Illegal logging detection', -0.4500, 35.5833),
('Mau Forest', '-0.4200°N, 35.6000°E', 'Camera Trap', 'active', 81, 'Mau Summit', 'Encroachment monitoring', -0.4200, 35.6000),
('Aberdare Forest', '-0.4167°N, 36.7167°E', 'LoRa Soil Sensor', 'active', 94, 'Kinale Forest', 'Water body monitoring', -0.4167, 36.7167),
('Karura Forest', '-1.2500°N, 36.8333°E', 'Motion', 'active', 88, 'Southern Gate', 'Unauthorized entry detection', -1.2500, 36.8333),
('Karura Forest', '-1.2400°N, 36.8400°E', 'Camera Trap', 'active', 76, 'Central Trail', 'Wildlife tracking', -1.2400, 36.8400),
('Ngong Road Forest', '-1.3000°N, 36.7500°E', 'Acoustic', 'offline', 12, 'Reserve Entrance', 'Illegal logging detection', -1.3000, 36.7500),
('Kakamega Forest', '0.2700°N, 34.8600°E', 'Smoke', 'active', 85, 'Bunyala Zone', 'Fire detection', 0.2700, 34.8600),
('Mau Forest', '-0.5000°N, 35.5500°E', 'Motion', 'active', 91, 'Eastern Block', 'Encroachment monitoring', -0.5000, 35.5500),
('Aberdare Forest', '-0.3800°N, 36.7500°E', 'Acoustic', 'active', 79, 'Ndaragwa Region', 'Illegal logging detection', -0.3800, 36.7500);

-- Insert sample alert data
INSERT INTO public.forest_alerts_kenya (sensor_id, alert_type, location, confidence_score, description, evidence_image_url) 
SELECT 
  id,
  CASE 
    WHEN sensor_type = 'Acoustic' THEN 'Chainsaw Activity'
    WHEN sensor_type = 'Motion' THEN 'Unauthorized Movement'
    WHEN sensor_type = 'Smoke' THEN 'Fire Risk'
    ELSE 'Encroachment'
  END,
  zone_name,
  CASE 
    WHEN battery_level > 80 THEN 0.95
    WHEN battery_level > 60 THEN 0.87
    ELSE 0.72
  END,
  CASE 
    WHEN sensor_type = 'Acoustic' THEN 'Chainsaw-like acoustic signature detected'
    WHEN sensor_type = 'Motion' THEN 'Unauthorized night movement detected'
    WHEN sensor_type = 'Smoke' THEN 'Smoke levels rising - possible fire'
    ELSE 'Suspicious activity recorded'
  END,
  NULL
FROM public.sensors_kenya
LIMIT 8;