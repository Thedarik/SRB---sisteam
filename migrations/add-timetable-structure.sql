-- Migration: Add Time Table Structure
-- Description: Create rooms table and add room/time_slot columns to groups table
-- Date: 2025-10-14

-- ================================================
-- 1. CREATE ROOMS TABLE
-- ================================================

CREATE TABLE IF NOT EXISTS public.rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  capacity INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add comments for documentation
COMMENT ON TABLE public.rooms IS 'Xonalar (dars xonalari) ro''yxati';
COMMENT ON COLUMN public.rooms.id IS 'Unique identifier';
COMMENT ON COLUMN public.rooms.name IS 'Xona nomi (masalan: Xona 1, A-xona)';
COMMENT ON COLUMN public.rooms.description IS 'Xona haqida qo''shimcha ma''lumot';
COMMENT ON COLUMN public.rooms.capacity IS 'Xonaning sig''imi (maksimal o''quvchilar soni)';
COMMENT ON COLUMN public.rooms.is_active IS 'Xona faolmi?';

-- ================================================
-- 2. ADD COLUMNS TO GROUPS TABLE
-- ================================================

-- Add room column
ALTER TABLE public.groups 
ADD COLUMN IF NOT EXISTS room VARCHAR(100);

-- Add time_slot column
ALTER TABLE public.groups 
ADD COLUMN IF NOT EXISTS time_slot VARCHAR(50);

-- Add comments
COMMENT ON COLUMN public.groups.room IS 'Dars o''tadigan xona nomi';
COMMENT ON COLUMN public.groups.time_slot IS 'Dars vaqti (masalan: 08:00 - 10:00)';

-- ================================================
-- 3. CREATE INDEXES FOR BETTER PERFORMANCE
-- ================================================

CREATE INDEX IF NOT EXISTS idx_rooms_name ON public.rooms(name);
CREATE INDEX IF NOT EXISTS idx_rooms_is_active ON public.rooms(is_active);
CREATE INDEX IF NOT EXISTS idx_groups_room ON public.groups(room);
CREATE INDEX IF NOT EXISTS idx_groups_time_slot ON public.groups(time_slot);
CREATE INDEX IF NOT EXISTS idx_groups_room_time_slot ON public.groups(room, time_slot);

-- ================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- ================================================

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read rooms
CREATE POLICY "Enable read access for all users" ON public.rooms
  FOR SELECT USING (true);

-- Policy: Authenticated users can insert rooms
CREATE POLICY "Enable insert for authenticated users" ON public.rooms
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy: Authenticated users can update rooms
CREATE POLICY "Enable update for authenticated users" ON public.rooms
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: Authenticated users can delete rooms
CREATE POLICY "Enable delete for authenticated users" ON public.rooms
  FOR DELETE USING (auth.role() = 'authenticated');

-- ================================================
-- 5. INSERT DEFAULT ROOMS (OPTIONAL)
-- ================================================

INSERT INTO public.rooms (name, description, capacity, is_active) 
VALUES 
  ('Xona 1', 'Asosiy dars xonasi', 30, true),
  ('Xona 2', 'Kichik guruhlar uchun', 20, true),
  ('Xona 3', 'Katta zal', 50, true)
ON CONFLICT (name) DO NOTHING;

-- ================================================
-- 6. CREATE FUNCTION TO UPDATE updated_at
-- ================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ================================================
-- 7. CREATE TRIGGER FOR ROOMS
-- ================================================

DROP TRIGGER IF EXISTS update_rooms_updated_at ON public.rooms;

CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- DONE!
-- ================================================

-- Verify tables
SELECT 'Rooms table created!' as status;
SELECT 'Groups table updated with room and time_slot columns!' as status;

