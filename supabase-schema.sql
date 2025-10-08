-- ============================================
-- EduCRM Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. GROUPS TABLE (Guruhlar)
-- ============================================
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  course_type VARCHAR(100) NOT NULL,
  schedule VARCHAR(50),
  start_date DATE,
  end_date DATE,
  teacher_name VARCHAR(255),
  max_students INTEGER DEFAULT 30,
  current_students INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. STUDENTS TABLE (O'quvchilar)
-- ============================================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL UNIQUE,
  passport_number VARCHAR(20),
  group_id UUID REFERENCES groups(id) ON DELETE SET NULL,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. PAYMENTS TABLE (To'lovlar)
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'completed',
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. ATTENDANCE TABLE (Davomad)
-- ============================================
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'present',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, date)
);

-- ============================================
-- 5. SMS LOGS TABLE (SMS tarixi)
-- ============================================
CREATE TABLE IF NOT EXISTS sms_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  phone_number VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  error_message TEXT
);

-- ============================================
-- INDEXES for better performance
-- ============================================
CREATE INDEX idx_students_phone ON students(phone_number);
CREATE INDEX idx_students_group ON students(group_id);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_date ON payments(payment_date);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(date);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_students_updated_at 
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at 
  BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;

-- Policies (hozircha barchaga ruxsat beramiz, keyinchalik o'zgartiramiz)
CREATE POLICY "Enable all for authenticated users" ON students
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users" ON groups
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users" ON payments
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users" ON attendance
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users" ON sms_logs
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Public read access (anon users can read)
CREATE POLICY "Enable read for anon users" ON students
  FOR SELECT TO anon USING (true);

CREATE POLICY "Enable read for anon users" ON groups
  FOR SELECT TO anon USING (true);

-- ============================================
-- SAMPLE DATA (Test uchun)
-- ============================================

-- Guruhlar qo'shamiz
INSERT INTO groups (name, course_type, schedule, start_date, end_date, teacher_name) VALUES
  ('Frontend Development - Ertalabki', 'Frontend Development', 'Dush-Chor-Juma 09:00-12:00', '2024-01-15', '2024-06-15', 'Rustam Toshmatov'),
  ('Frontend Development - Kechki', 'Frontend Development', 'Dush-Chor-Juma 18:00-21:00', '2024-01-15', '2024-06-15', 'Bekzod Nurmatov'),
  ('Digital Marketing', 'Digital Marketing', 'Sesh-Pays 14:00-17:00', '2024-02-01', '2024-05-01', 'Malika Karimova'),
  ('Backend Development - Ertalabki', 'Backend Development', 'Dush-Chor-Juma 09:00-12:00', '2024-03-01', '2024-08-01', 'Jasur Abdullayev');

-- Test o'quvchilar (ixtiyoriy)
-- INSERT INTO students (full_name, phone_number, passport_number, group_id, status) VALUES
--   ('Abdullayev Jasur Akmalovich', '+998901234567', 'AA1234567', (SELECT id FROM groups WHERE name = 'Frontend Development - Ertalabki' LIMIT 1), 'active'),
--   ('Karimova Malika Sharipovna', '+998912345678', 'AA2345678', (SELECT id FROM groups WHERE name = 'Digital Marketing' LIMIT 1), 'active');

-- ============================================
-- DONE! ✅
-- ============================================

