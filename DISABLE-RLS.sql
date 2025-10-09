-- ============================================
-- RLS NI TO'LIQ O'CHIRISH
-- BU SQL KODNI SUPABASE SQL EDITOR DA ISHLATILSIN!
-- ============================================

-- 1. Barcha policy'larni o'chirish
DROP POLICY IF EXISTS "Enable read for anon users" ON students;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable all operations for anon users" ON students;
DROP POLICY IF EXISTS "Enable read for anon users" ON groups;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON groups;
DROP POLICY IF EXISTS "Enable all operations for anon users" ON groups;
DROP POLICY IF EXISTS "Enable read for anon users" ON payments;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON payments;
DROP POLICY IF EXISTS "Enable read for anon users" ON attendance;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON attendance;
DROP POLICY IF EXISTS "Enable read for anon users" ON sms_logs;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON sms_logs;

-- 2. RLS'ni butunlay o'chirish
ALTER TABLE students DISABLE ROW LEVEL SECURITY;
ALTER TABLE groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE attendance DISABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs DISABLE ROW LEVEL SECURITY;

-- 3. Tekshirish - RLS o'chirilganligini ko'rish uchun
SELECT 
    schemaname, 
    tablename, 
    rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('students', 'groups', 'payments', 'attendance', 'sms_logs');

-- Natija: rowsecurity = false bo'lishi kerak!

-- ============================================
-- TAYYOR! ✅
-- ============================================



