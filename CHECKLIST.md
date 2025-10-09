# ✅ Setup Checklist - O'quvchi Qo'shish Funksiyasi

Quyidagi barcha bandlarni tekshiring va belgilang:

---

## 📋 1. Environment Variables

- [ ] `.env.local` fayl yaratilgan (globe-component papkasida)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` qo'shilgan
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` qo'shilgan
- [ ] `SUPABASE_SERVICE_ROLE_KEY` qo'shilgan ⭐ (ENG MUHIM!)

**Test qilish:**
```bash
# Terminal'da
cat .env.local
# yoki Windows PowerShell'da
type .env.local
```

Natijada 3ta o'zgaruvchi ko'rinishi kerak.

---

## 📋 2. Supabase Database

- [ ] Supabase loyihasi yaratilgan
- [ ] `supabase-schema.sql` ishga tushirilgan
- [ ] `groups` jadvalida ma'lumotlar bor
- [ ] `students` jadvali yaratilgan

**Test qilish:**

Supabase SQL Editor'da:
```sql
-- Guruhlar borligini tekshirish
SELECT * FROM groups WHERE status = 'active';

-- Natija: Kamida 1-2 ta guruh ko'rinishi kerak
```

Agar bo'sh bo'lsa:
```sql
-- Sample guruh qo'shish
INSERT INTO groups (name, course_type, schedule, start_date, end_date) 
VALUES ('Test Guruh', 'Frontend Development', 'Dush-Chor-Juma 09:00', '2024-01-01', '2024-06-01');
```

---

## 📋 3. Dependencies

- [ ] `npm install` yoki `npm install --legacy-peer-deps` bajarilgan
- [ ] `node_modules` papkasi mavjud
- [ ] Xatoliksiz o'rnatilgan

**Test qilish:**
```bash
npm list @supabase/supabase-js
# Natija: version raqami ko'rinishi kerak
```

---

## 📋 4. Server

- [ ] `npm run dev` ishga tushirilgan
- [ ] Terminal'da xatolik yo'q
- [ ] Port 3000 band emas (yoki boshqa port ko'rsatilgan)
- [ ] http://localhost:3000 ochiladi

**Kutilgan terminal log:**
```
  ▲ Next.js 15.2.4
  - Local:        http://localhost:3000
  - ready started server on 0.0.0.0:3000
```

---

## 📋 5. Frontend

- [ ] Dashboard sahifasi ochiladi
- [ ] "Yangi O'quvchi Qo'shish" tugmasi ko'rinadi
- [ ] Tugmani bosganda dialog ochiladi
- [ ] Guruhlar dropdown'da ma'lumotlar bor

**Test qilish:**

1. Browser Console'ni oching (F12)
2. Console tab'da qizil xatoliklar yo'qligini tekshiring
3. Network tab'da `/api/groups` request'ni ko'ring
4. Response status: **200 OK** bo'lishi kerak

---

## 📋 6. O'quvchi Qo'shish Funksiyasi

- [ ] Dialog forma ochiladi
- [ ] Barcha maydonlar ko'rinadi:
  - [ ] Ism sharif
  - [ ] Telefon raqam  
  - [ ] Passport (ixtiyoriy)
  - [ ] Guruh dropdown
- [ ] Guruh tanlash mumkin
- [ ] "O'quvchi Qo'shish" tugmasi faol

**Test qilish:**

Formani to'ldiring:
- Ism: `Test Oquvchi`
- Telefon: `+998901234567`
- Guruh: `Biror guruhni tanlang`

"O'quvchi Qo'shish" ni bosing.

---

## 📋 7. Success Test

- [ ] Alert: "✅ O'quvchi muvaffaqiyatli qo'shildi!" ko'rinadi
- [ ] Sahifa yangilanadi
- [ ] Yangi o'quvchi ro'yxatda ko'rinadi (agar ro'yxat sahifasi bo'lsa)
- [ ] Terminal'da log: "✅ O'quvchi muvaffaqiyatli qo'shildi"

**Browser Console'da:**
```
✅ Yangi o'quvchi qo'shildi: { id: "...", full_name: "...", ... }
```

**Terminal'da:**
```
📥 Yangi o'quvchi ma'lumotlari: { full_name: 'Test Oquvchi', ... }
✅ Validation o'tdi
✅ Telefon raqam unique
📝 Database ga yozilmoqda: ...
✅ O'quvchi muvaffaqiyatli qo'shildi: <uuid>
```

---

## 📋 8. Error Handling Test

### Test 1: Bo'sh Form
- [ ] Formani bo'sh qoldiring
- [ ] "O'quvchi Qo'shish" ni bosing
- [ ] Alert: "❌ Ism sharifni kiriting!" ko'rinadi

### Test 2: Telefon Yo'q
- [ ] Faqat ismni kiriting
- [ ] Alert: "❌ Telefon raqamni kiriting!" ko'rinadi

### Test 3: Guruh Tanlanmagan
- [ ] Ism va telefon kiritilgan, guruh tanlanmagan
- [ ] Alert: "❌ Guruhni tanlang!" ko'rinadi

### Test 4: Takroriy Telefon
- [ ] Birinchi marta o'quvchi qo'shing
- [ ] Xuddi shu telefon bilan qayta qo'shishga urinib ko'ring
- [ ] Alert: "Bu telefon raqam allaqachon ro'yxatdan o'tgan!" ko'rinadi

---

## 📋 9. Supabase Dashboard Tekshiruv

- [ ] Supabase → Table Editor → students
- [ ] Yangi qo'shilgan o'quvchi ko'rinadi
- [ ] Ma'lumotlar to'g'ri (ism, telefon, group_id)
- [ ] `created_at` va `enrollment_date` to'g'ri

---

## 📋 10. Production Readiness

- [ ] `.env.local` `.gitignore`da
- [ ] `SUPABASE_SERVICE_ROLE_KEY` hech qachon commit qilinmagan
- [ ] Code'da `console.log` lar yoki debug log'lar yo'q (production uchun)
- [ ] Error messages user-friendly

---

## 🎯 Barcha Belgilangan Bo'lsa...

### ✅ HAMMASI TAYYOR!

O'quvchi qo'shish funksiyasi to'liq ishlaydi va production uchun tayyor.

---

## ❌ Agar Biror Band Belgilanmagan Bo'lsa...

### Muammo Environment'da?
→ `ENV-SETUP.md` ni o'qing

### Muammo Database'da?
→ `SETUP-GUIDE.md` ni o'qing

### Muammo Code'da?
→ `BUGFIX-SUMMARY.md` ni o'qing

### Tez yechim kerakmi?
→ `TEZKOR-YECHIM.md` ni o'qing

---

## 📸 Screenshot Checklist

Quyidagilarning screenshot'ini oling (kerak bo'lsa):

- [ ] `.env.local` fayl (SERVICE_ROLE_KEY ni blur qiling!)
- [ ] Supabase groups jadvali
- [ ] Terminal log (muvaffaqiyatli qo'shish)
- [ ] Browser alert (muvaffaqiyat)
- [ ] Supabase students jadvali (yangi o'quvchi)

---

**Omad! 🚀**

Checklist tugagandan so'ng, sizda to'liq ishlaydigan o'quvchi qo'shish funksiyasi bo'ladi!

