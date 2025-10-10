# 🚀 Supabase Setup Guide

## ✅ Tayyor bo'lgan narsalar:

1. ✅ Supabase package o'rnatildi
2. ✅ Environment variables sozlandi (.env.local)
3. ✅ Supabase client yaratildi (lib/supabase.ts)
4. ✅ API routes yaratildi:
   - `/api/students` - GET, POST
   - `/api/students/[id]` - GET, PUT, DELETE
   - `/api/groups` - GET
5. ✅ Frontend bilan bog'landi

---

## 📋 KERAKLI QADAMLAR:

### 1️⃣ **Supabase Dashboard'ga kiring**

URL: https://vxatszzzgpfsonjxzeel.supabase.co

### 2️⃣ **Database Tables yaratish**

1. Dashboard'da **SQL Editor** ni oching (chap menyu)
2. **"New query"** tugmasini bosing
3. `supabase-schema.sql` faylidagi barcha SQL kodni ko'chirib qo'ying
4. **"RUN"** tugmasini bosing ▶️

Bu quyidagi jadvallarni yaratadi:
- ✅ `students` - O'quvchilar
- ✅ `groups` - Guruhlar
- ✅ `payments` - To'lovlar
- ✅ `attendance` - Davomad
- ✅ `sms_logs` - SMS tarixi

### 3️⃣ **Serverni restart qiling**

```bash
# Ctrl+C bilan to'xtating, keyin:
npm run dev
```

---

## 🧪 TEST QILISH:

### 1. Dashboard'ga kiring:
```
http://localhost:3000
```

### 2. "Yangi O'quvchi Qo'shish" tugmasini bosing

### 3. Formani to'ldiring:
- **Ism Sharifi**: Abdullayev Jasur Akmalovich
- **Telefon**: +998901234567
- **Passport**: AA1234567 (ixtiyoriy)
- **Guruh**: Ro'yxatdan birini tanlang

### 4. "O'quvchi Qo'shish" ni bosing

### 5. Supabase Dashboard'da tekshiring:
- **Table Editor** → `students` jadvalini oching
- Yangi o'quvchi ko'rinishi kerak! ✅

---

## 📊 DATABASE STRUCTURE:

```
students
├── id (UUID)
├── full_name (VARCHAR)
├── phone_number (VARCHAR) - UNIQUE
├── passport_number (VARCHAR) - Optional
├── group_id (UUID) → groups.id
├── enrollment_date (TIMESTAMP)
├── status (VARCHAR) - 'active', 'inactive', 'graduated'
└── created_at, updated_at

groups
├── id (UUID)
├── name (VARCHAR)
├── course_type (VARCHAR)
├── schedule (VARCHAR)
├── start_date, end_date (DATE)
├── teacher_name (VARCHAR)
└── created_at, updated_at

payments
├── id (UUID)
├── student_id (UUID) → students.id
├── amount (DECIMAL)
├── payment_date (TIMESTAMP)
├── status (VARCHAR)
└── created_at

attendance
├── id (UUID)
├── student_id (UUID) → students.id
├── group_id (UUID) → groups.id
├── date (DATE)
├── status (VARCHAR) - 'present', 'absent', 'late'
└── created_at
```

---

## 🔧 API ENDPOINTS:

### Students:
- `GET /api/students` - Barcha o'quvchilar
- `GET /api/students?status=active` - Faol o'quvchilar
- `POST /api/students` - Yangi o'quvchi qo'shish
- `GET /api/students/[id]` - Bitta o'quvchi
- `PUT /api/students/[id]` - O'quvchini tahrirlash
- `DELETE /api/students/[id]` - O'quvchini o'chirish

### Groups:
- `GET /api/groups` - Barcha guruhlar

---

## 🐛 MUAMMOLAR VA YECHIMLAR:

### Xato: "relation does not exist"
**Yechim:** SQL script ishlatilmagandir. Yuqoridagi 2-qadamni bajaring.

### Xato: "Invalid API key"
**Yechim:** `.env.local` faylni tekshiring. Server restart qiling.

### Xato: "fetch failed"
**Yechim:** Internet aloqasini tekshiring. Supabase loyiha faol ekanligiga ishonch hosil qiling.

---

## 📈 KEYINGI QADAMLAR:

1. ✅ O'quvchilar ro'yxatini API dan olish
2. ✅ O'quvchini tahrirlash funksiyasi
3. ✅ O'quvchini o'chirish funksiyasi
4. ⏳ To'lovlar tizimi
5. ⏳ Davomad belgilash
6. ⏳ SMS yuborish (Eskiz.uz)
7. ⏳ Hisobotlar generatsiya qilish

---

## 🎉 MUVAFFAQIYAT!

Agar barcha qadamlar to'g'ri bajarilgan bo'lsa:
- ✅ O'quvchi qo'shish ishlaydi
- ✅ Ma'lumotlar Supabase'ga saqlanadi
- ✅ Real-time sana/vaqt avtomatik aniqlanadi

**Muammolar bo'lsa, men yordam beraman! 💪**





