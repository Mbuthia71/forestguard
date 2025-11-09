-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for alert severity
CREATE TYPE alert_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Create enum for alert source
CREATE TYPE alert_source AS ENUM ('satellite', 'iot_sensor', 'blockchain_report');

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  severity alert_severity NOT NULL DEFAULT 'medium',
  source alert_source NOT NULL,
  description TEXT,
  metadata JSONB,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create IoT sensor data table
CREATE TABLE public.sensor_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  node_id TEXT NOT NULL,
  location TEXT NOT NULL,
  temperature DECIMAL(5, 2),
  humidity DECIMAL(5, 2),
  sound_detected BOOLEAN DEFAULT false,
  motion_detected BOOLEAN DEFAULT false,
  battery_level INTEGER CHECK (battery_level >= 0 AND battery_level <= 100),
  signal_strength INTEGER CHECK (signal_strength >= -120 AND signal_strength <= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create blockchain reports table
CREATE TABLE public.blockchain_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  evidence_url TEXT,
  ipfs_hash TEXT,
  blockchain_tx_hash TEXT,
  verified BOOLEAN DEFAULT false,
  reporter_anonymous_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blockchain_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (monitoring platform)
CREATE POLICY "Allow public read access to alerts"
  ON public.alerts FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to sensor data"
  ON public.sensor_data FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to blockchain reports"
  ON public.blockchain_reports FOR SELECT
  USING (true);

-- Create policies for insert (for demo purposes - in production would be restricted)
CREATE POLICY "Allow public insert to alerts"
  ON public.alerts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert to sensor data"
  ON public.sensor_data FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert to blockchain reports"
  ON public.blockchain_reports FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_alerts_created_at ON public.alerts(created_at DESC);
CREATE INDEX idx_alerts_severity ON public.alerts(severity);
CREATE INDEX idx_alerts_source ON public.alerts(source);
CREATE INDEX idx_sensor_data_created_at ON public.sensor_data(created_at DESC);
CREATE INDEX idx_sensor_data_node_id ON public.sensor_data(node_id);
CREATE INDEX idx_blockchain_reports_created_at ON public.blockchain_reports(created_at DESC);
CREATE INDEX idx_blockchain_reports_verified ON public.blockchain_reports(verified);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for alerts updated_at
CREATE TRIGGER update_alerts_updated_at
  BEFORE UPDATE ON public.alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sensor_data;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blockchain_reports;