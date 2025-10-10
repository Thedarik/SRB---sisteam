-- ============================================
-- THEAM JADVALINI RANGLAR BILAN TO'LDIRISH
-- ============================================
-- Jadval: public.theam (id, name, colors)
-- colors - TEXT formatda JSON string

-- Avval mavjud theme'larni o'chirish (ixtiyoriy)
-- DELETE FROM public.theam;

-- ============================================
-- 12 ta Chiroyli Rang Palitra
-- ============================================

INSERT INTO public.theam (name, colors) VALUES
(
  'Ko''k-Binafsha-Yashil',
  '{"primary": "#2563EB", "secondary": "#9333EA", "accent": "#16A34A"}'
),
(
  'Qizil-Pushti-Sariq',
  '{"primary": "#DC2626", "secondary": "#EC4899", "accent": "#F59E0B"}'
),
(
  'Moviy-Ko''k-Yashil',
  '{"primary": "#0EA5E9", "secondary": "#3B82F6", "accent": "#10B981"}'
),
(
  'Binafsha-Pushti-Qizil',
  '{"primary": "#7C3AED", "secondary": "#D946EF", "accent": "#F43F5E"}'
),
(
  'Qora-Oltin Premium',
  '{"primary": "#1F2937", "secondary": "#F59E0B", "accent": "#FCD34D"}'
),
(
  'Och Ko''k-Pushti',
  '{"primary": "#67E8F9", "secondary": "#F9A8D4", "accent": "#A78BFA"}'
),
(
  'To''q Yashil-Moviy',
  '{"primary": "#059669", "secondary": "#0891B2", "accent": "#0284C7"}'
),
(
  'Apelsin-Qizil-Sariq',
  '{"primary": "#EA580C", "secondary": "#DC2626", "accent": "#FACC15"}'
),
(
  'Indigo-Binafsha-Ko''k',
  '{"primary": "#4F46E5", "secondary": "#7C3AED", "accent": "#3B82F6"}'
),
(
  'Pushti-Qizilgul-Sariq',
  '{"primary": "#EC4899", "secondary": "#F43F5E", "accent": "#FDE047"}'
),
(
  'Tun Ko''k-Binafsha',
  '{"primary": "#1E3A8A", "secondary": "#581C87", "accent": "#6B21A8"}'
),
(
  'Yashil-Limon-Sariq',
  '{"primary": "#15803D", "secondary": "#84CC16", "accent": "#EAB308"}'
);

-- ============================================
-- DONE! ✅
-- ============================================
-- Endi 12 ta chiroyli rang palitra mavjud!

-- Tekshirish:
-- SELECT * FROM public.theam;


