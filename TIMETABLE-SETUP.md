# 📅 Time Table Setup - Supabase

Bu qo'llanma Time Table (Dars Jadvali) bo'limini Supabase bilan ishga tushirish uchun.

## 🎯 Nimalar qilindi?

### 1. Database Structure
- ✅ `rooms` jadvali yaratildi
- ✅ `groups` jadvaliga `room` va `time_slot` ustunlari qo'shildi
- ✅ Indexlar va RLS policies sozlandi

### 2. API Endpoints
- ✅ `GET /api/rooms` - Barcha xonalarni olish
- ✅ `POST /api/rooms` - Yangi xona qo'shish
- ✅ `GET /api/rooms/[id]` - Bitta xonani olish
- ✅ `PUT /api/rooms/[id]` - Xonani yangilash
- ✅ `DELETE /api/rooms/[id]` - Xonani o'chirish

### 3. Frontend Integration
- ✅ Xonalar Supabase'dan yuklanadi
- ✅ CRUD operatsiyalar API orqali
- ✅ Time table guruhlarni xona va vaqt bo'yicha ko'rsatadi

## 🚀 Qanday ishga tushirish?

### Qadam 1: Supabase SQL Editor'ga o'ting

1. Supabase Dashboard'ni oching: https://app.supabase.com
2. O'z loyihangizni tanlang
3. Chap menyudan **SQL Editor** ni bosing

### Qadam 2: Migration faylini bajaring

1. **New query** tugmasini bosing
2. `migrations/add-timetable-structure.sql` faylining barcha kodini nusxa oling
3. SQL Editor'ga joylashtiring
4. **Run** tugmasini bosing (yoki Ctrl+Enter)

### Qadam 3: Natijani tekshiring

Agar hammasi to'g'ri bo'lsa, quyidagi xabarlarni ko'rasiz:
```
✓ Rooms table created!
✓ Groups table updated with room and time_slot columns!
```

### Qadam 4: Jadvallarni tekshiring

1. Chap menyudan **Table Editor** ni bosing
2. `rooms` jadvalini toping - 3 ta default xona bo'lishi kerak:
   - Xona 1
   - Xona 2  
   - Xona 3
3. `groups` jadvalini oching va yangi ustunlarni ko'ring:
   - `room` (varchar)
   - `time_slot` (varchar)

## 📊 Rooms Table Structure

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | VARCHAR(100) | Xona nomi (UNIQUE) |
| `description` | TEXT | Xona haqida ma'lumot |
| `capacity` | INTEGER | Maksimal sig'im |
| `is_active` | BOOLEAN | Faolmi? |
| `created_at` | TIMESTAMP | Yaratilgan vaqt |
| `updated_at` | TIMESTAMP | Yangilangan vaqt |

## 📊 Groups Table - Yangi Ustunlar

| Column | Type | Description |
|--------|------|-------------|
| `room` | VARCHAR(100) | Dars xonasi nomi |
| `time_slot` | VARCHAR(50) | Dars vaqti (08:00 - 10:00) |

## 🔒 Security (RLS Policies)

Barcha foydalanuvchilar xonalarni ko'rishi mumkin, lekin faqat authenticated users qo'shish/tahrirlash/o'chirish mumkin.

## ✅ Test qilish

1. Dasturni ishga tushiring: `npm run dev`
2. Admin panelga kiring
3. **Dars Jadvali** bo'limiga o'ting
4. **Xona Qo'shish** tugmasini bosing
5. Yangi xona qo'shing (masalan: "Katta Zal")
6. **Kurslar** bo'limiga o'ting
7. Yangi guruh qo'shishda **Xona** va **Dars Vaqti** tanlang
8. **Dars Jadvali**ga qaytib jadvalga qarang!

## 🐛 Muammolar?

### Migration ishlamasa:

1. SQL kodda sintaksis xatosi bormi tekshiring
2. Supabase loyihangiz aktiv ekanligini tasdiqlang
3. Internetga ulanganingizni tekshiring

### API ishlamasa:

1. `.env.local` faylida Supabase credentials to'g'rimi?
2. RLS policies to'g'ri sozlanganmi?
3. Browser console'da xatoliklarni tekshiring (F12)

### Rooms ko'rinmasa:

1. SQL migration to'liq bajarilganmi?
2. `rooms` jadvalida ma'lumotlar bormi? (Table Editor'da tekshiring)
3. API `/api/rooms` ishlayaptimi? (Browser Network tab'da tekshiring)

## 📝 Eslatma

- Xonani o'chirishdan oldin, bu xonada dars o'tayotgan guruhlar borligini tekshiring
- Guruhni o'chirish xonani avtomatik o'chirmaydi
- Default 3 ta xona yaratiladi, lekin istalganicha qo'sha olasiz

## 🎉 Tayyor!

Endi Time Table to'liq ishlaydi va Supabase bilan integratsiyalashgan!

Savollar bo'lsa yoki muammo bo'lsa, adminni xabardor qiling.

