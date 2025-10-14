-- Migration: Add room and time_slot columns to groups table
-- Description: Add missing columns for timetable functionality
-- Date: 2025-10-14

-- ================================================
-- ADD COLUMNS TO GROUPS TABLE
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
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- ================================================

CREATE INDEX IF NOT EXISTS idx_groups_room ON public.groups(room);
CREATE INDEX IF NOT EXISTS idx_groups_time_slot ON public.groups(time_slot);
CREATE INDEX IF NOT EXISTS idx_groups_room_time_slot ON public.groups(room, time_slot);

-- ================================================
-- VERIFY CHANGES
-- ================================================

-- Check if columns were added successfully
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'groups' 
AND column_name IN ('room', 'time_slot');

-- Show current groups table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'groups' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- ================================================
-- DONE!
-- ================================================

SELECT 'Groups table updated with room and time_slot columns!' as status;
