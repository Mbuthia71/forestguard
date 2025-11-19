-- Add employment fields to rangers table
ALTER TABLE rangers 
ADD COLUMN place_of_employment TEXT DEFAULT 'Kenya Forest Service',
ADD COLUMN employee_id TEXT,
ADD COLUMN department TEXT,
ADD COLUMN position TEXT DEFAULT 'Forest Ranger';