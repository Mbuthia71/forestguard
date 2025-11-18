-- Create enum for user roles (extending existing)
DO $$ BEGIN
  CREATE TYPE public.user_role_type AS ENUM ('admin', 'ranger', 'stakeholder');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Forest zones/boundaries table
CREATE TABLE public.forest_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  boundary_geojson JSONB NOT NULL,
  area_hectares NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ranger profiles (extends user profiles)
CREATE TABLE public.rangers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_zones UUID[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Field reports from rangers
CREATE TABLE public.field_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ranger_id UUID NOT NULL REFERENCES public.rangers(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL CHECK (report_type IN ('fire', 'logging', 'encroachment', 'wildlife', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  photos JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  synced_at TIMESTAMPTZ
);

-- Tasks/Missions for rangers
CREATE TABLE public.ranger_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assigned_to UUID REFERENCES public.rangers(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'cancelled')),
  due_date TIMESTAMPTZ,
  location_lat NUMERIC,
  location_lng NUMERIC,
  zone_id UUID REFERENCES public.forest_zones(id),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Satellite layers
CREATE TABLE public.satellite_layers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  layer_type TEXT NOT NULL CHECK (layer_type IN ('sentinel-1', 'sentinel-2', 'ndvi', 'nbr', 'land-cover', 'custom')),
  date_captured DATE NOT NULL,
  file_url TEXT,
  thumbnail_url TEXT,
  metadata JSONB DEFAULT '{}',
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Forest health summaries (AI-generated)
CREATE TABLE public.forest_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  summary_type TEXT NOT NULL CHECK (summary_type IN ('daily', 'weekly', 'monthly', 'custom')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  ai_summary TEXT,
  metrics JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.forest_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rangers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ranger_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.satellite_layers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forest_summaries ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Forest Zones
CREATE POLICY "Everyone can view forest zones"
  ON public.forest_zones FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage forest zones"
  ON public.forest_zones FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies: Rangers
CREATE POLICY "Admins can manage rangers"
  ON public.rangers FOR ALL
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Rangers can view their own profile"
  ON public.rangers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Rangers can update their own profile"
  ON public.rangers FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies: Field Reports
CREATE POLICY "Rangers can create field reports"
  ON public.field_reports FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.rangers WHERE user_id = auth.uid() AND id = ranger_id
  ));

CREATE POLICY "Rangers can view their own reports"
  ON public.field_reports FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.rangers WHERE user_id = auth.uid() AND id = ranger_id
  ));

CREATE POLICY "Admins can view all field reports"
  ON public.field_reports FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update field reports"
  ON public.field_reports FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies: Ranger Tasks
CREATE POLICY "Rangers can view their assigned tasks"
  ON public.ranger_tasks FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.rangers WHERE user_id = auth.uid() AND id = assigned_to
  ));

CREATE POLICY "Rangers can update their task status"
  ON public.ranger_tasks FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.rangers WHERE user_id = auth.uid() AND id = assigned_to
  ));

CREATE POLICY "Admins can manage all tasks"
  ON public.ranger_tasks FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies: Satellite Layers
CREATE POLICY "Everyone can view satellite layers"
  ON public.satellite_layers FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage satellite layers"
  ON public.satellite_layers FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies: Forest Summaries
CREATE POLICY "Everyone can view summaries"
  ON public.forest_summaries FOR SELECT
  USING (true);

CREATE POLICY "Admins can create summaries"
  ON public.forest_summaries FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_field_reports_ranger ON public.field_reports(ranger_id);
CREATE INDEX idx_field_reports_status ON public.field_reports(status);
CREATE INDEX idx_field_reports_created ON public.field_reports(created_at DESC);
CREATE INDEX idx_ranger_tasks_assigned ON public.ranger_tasks(assigned_to);
CREATE INDEX idx_ranger_tasks_status ON public.ranger_tasks(status);
CREATE INDEX idx_satellite_layers_date ON public.satellite_layers(date_captured DESC);

-- Triggers for updated_at
CREATE TRIGGER update_forest_zones_updated_at
  BEFORE UPDATE ON public.forest_zones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rangers_updated_at
  BEFORE UPDATE ON public.rangers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_field_reports_updated_at
  BEFORE UPDATE ON public.field_reports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ranger_tasks_updated_at
  BEFORE UPDATE ON public.ranger_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();