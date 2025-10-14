# 🔧 Groups Table Fix - Supabase

Bu qo'llanma `groups` jadvaliga `room` va `time_slot` ustunlarini qo'shish uchun.

## 🎯 Muammo

Supabase'da `rooms` jadvali mavjud, lekin `groups` jadvalida `room` va `time_slot` ustunlari yo'q. Shuning uchun dars jadvalida guruhlar ko'rinmayapti.

## 🚀 Qanday tuzatish?

### Qadam 1: Supabase SQL Editor'ga o'ting

1. Supabase Dashboard: https://app.supabase.com
2. O'z loyihangizni tanlang
3. Chap menyudan **SQL Editor** ni bosing

### Qadam 2: Migration kodini bajaring

1. **New query** tugmasini bosing
2. Quyidagi kodni nusxa oling va joylashtiring:

```sql
-- Add room column
ALTER TABLE public.groups 
ADD COLUMN IF NOT EXISTS room VARCHAR(100);

-- Add time_slot column
ALTER TABLE public.groups 
ADD COLUMN IF NOT EXISTS time_slot VARCHAR(50);

-- Add comments
COMMENT ON COLUMN public.groups.room IS 'Dars o''tadigan xona nomi';
COMMENT ON COLUMN public.groups.time_slot IS 'Dars vaqti (masalan: 08:00 - 10:00)';

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_groups_room ON public.groups(room);
CREATE INDEX IF NOT EXISTS idx_groups_time_slot ON public.groups(time_slot);
CREATE INDEX IF NOT EXISTS idx_groups_room_time_slot ON public.groups(room, time_slot);
```

3. **Run** tugmasini bosing (yoki Ctrl+Enter)

### Qadam 3: Natijani tekshiring

Agar hammasi to'g'ri bo'lsa, quyidagi xabarni ko'rasiz:
```
✓ Groups table updated with room and time_slot columns!
```

**Jadvalni tekshirish uchun:**

```sql
-- Groups jadvalining strukturasini ko'rish
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'groups' 
AND table_schema = 'public'
ORDER BY ordinal_position;
```

### Qadam 4: Table Editor'da tekshiring

1. Chap menyudan **Table Editor** ni bosing
2. `groups` jadvalini tanlang
3. Yangi ustunlarni ko'ring:
   - `room` (varchar)
   - `time_slot` (varchar)

## ✅ Test qilish

1. Dasturni yangilang: `npm run dev`
2. Brauzerda sahifani yangilang (F5)
3. **Kurslar** → Yangi guruh yarating:
   - Xona tanlang
   - Vaqt slotini tanlang
4. **Dars Jadvali**ga o'ting
5. Guruh jadvalda ko'rinishi kerak!

## 🐛 Muammolar?

### SQL ishlamasa:

1. `groups` jadvali mavjudligini tekshiring
2. RLS policies'ni tekshiring
3. Internetga ulanganingizni tasdiqlang

### Guruhlar hali ham ko'rinmasa:

1. Guruhni tahrirlang va xona/vaqt qo'shing
2. Browser console'da xatoliklarni tekshiring (F12)
3. Network tab'da API so'rovlarini tekshiring

## 📝 Eslatma

- Eski guruhlarni tahrirlash kerak bo'lishi mumkin
- Faqat `room` va `time_slot` to'ldirilgan guruhlar jadvalda ko'rinadi
- Guruh statusi `active` bo'lishi kerak

## 🎉 Tayyor!

Endi dars jadvali to'liq ishlaydi!
