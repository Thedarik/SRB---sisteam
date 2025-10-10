-- ============================================
-- FIX RLS (Row Level Security) MUAMMOSI
-- ============================================

-- 1. Eski policy'larni o'chirish
DROP POLICY IF EXISTS "Enable read for anon users" ON students;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable read for anon users" ON groups;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON groups;

-- 2. RLS'ni butunlay o'chirish (Development uchun eng oson)
ALTER TABLE students DISABLE ROW LEVEL SECURITY;
ALTER TABLE groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE attendance DISABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs DISABLE ROW LEVEL SECURITY;

-- ============================================
-- Tayyor! Endi o'quvchi qo'shish ishlashi kerak ✅
-- ============================================





