# EduCRM - Setup Guide (Sozlash Qo'llanmasi)

## 🚀 Tezkor Boshlash

### 1. Environment Variables (Muhit O'zgaruvchilari)

`.env.local` faylini yarating va quyidagilarni kiriting:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Qayerdan topish mumkin?**

1. Supabase dashboard'ga kiring: https://app.supabase.com
2. Loyihangizni tanlang
3. Settings → API ga o'ting
4. Project URL va API Keys'ni ko'chirib oling

⚠️ **MUHIM**: `SUPABASE_SERVICE_ROLE_KEY` ni hech qachon browser'ga yuklamas uchun `NEXT_PUBLIC_` prefixi qo'shmang!

### 2. Database Schema O'rnatish

Supabase SQL Editor'da `supabase-schema.sql` faylini ishga tushiring:

1. Supabase dashboard → SQL Editor
2. `supabase-schema.sql` faylni oching
3. Barcha SQL query'larni nusxa ko'chirib SQL Editor'ga joylashtiring
4. Run (Ishga tushirish) tugmasini bosing

Bu quyidagilarni yaratadi:
- ✅ `groups` - Guruhlar jadvali
- ✅ `students` - O'quvchilar jadvali  
- ✅ `payments` - To'lovlar jadvali
- ✅ `attendance` - Davomad jadvali
- ✅ `sms_logs` - SMS tarixi jadvali
- ✅ Indekslar va trigger'lar
- ✅ Row Level Security (RLS) policies

### 3. Paketlarni O'rnatish

```bash
cd globe-component
npm install
```

### 4. Development Serverni Ishga Tushirish

```bash
npm run dev
```

Brauzerda ochish: http://localhost:3000

---

## 🔧 Muammolarni Hal Qilish

### Muammo: "500 Internal Server Error" student qo'shganda

**Sabab**: Service Role Key to'g'ri o'rnatilmagan yoki RLS policy'lar noto'g'ri.

**Yechim**:
1. `.env.local` faylida `SUPABASE_SERVICE_ROLE_KEY` mavjudligini tekshiring
2. Server'ni qayta ishga tushiring (`npm run dev`ni to'xtatib qaytadan boshlang)
3. Browser console va terminal log'larni tekshiring

### Muammo: Guruhlar yuklanmayapti

**Yechim**:
1. Supabase'da `groups` jadvalida ma'lumotlar borligini tekshiring
2. SQL Editor'da test qiling:
```sql
SELECT * FROM groups WHERE status = 'active';
```
3. Agar bo'sh bo'lsa, sample data qo'shing (supabase-schema.sql'dan)

### Muammo: "Row Level Security" xatoligi

**Yechim**:

Agar RLS muammo keltirayotgan bo'lsa, API route'larda `supabaseAdmin` ishlatilganligini tekshiring:

```typescript
import { supabaseAdmin } from '@/lib/supabase-admin'

// ✅ To'g'ri
const { data } = await supabaseAdmin.from('students').select()

// ❌ Noto'g'ri (RLS'ga tushadi)
const { data } = await supabase.from('students').select()
```

---

## 📋 Tekshirish Ro'yxati

Qo'shishdan oldin quyidagilarni tekshiring:

- [ ] `.env.local` fayli yaratilgan
- [ ] Barcha 3 ta environment variable to'g'ri to'ldirilgan
- [ ] Database schema SQL ishga tushirilgan
- [ ] `npm install` bajarilib bo'lgan
- [ ] Development server ishga tushgan
- [ ] Brauzerda sahifa ochiladi
- [ ] Guruhlar dropdown'da ko'rinadi

---

## 🎯 API Endpoint'lar

### Students API
- **GET** `/api/students` - Barcha o'quvchilar
- **POST** `/api/students` - Yangi o'quvchi qo'shish

### Groups API  
- **GET** `/api/groups` - Barcha faol guruhlar

---

## 🔐 Xavfsizlik

- ✅ API route'lar service role key ishlatadi (RLS bypass)
- ✅ Frontend validatsiya mavjud
- ✅ Backend validatsiya mavjud
- ✅ Telefon raqam uniqueness tekshiriladi
- ✅ Guruh mavjudligi tekshiriladi
- ✅ Xatoliklar user-friendly ko'rsatiladi

---

## 📞 Yordam

Agar muammolar davom etsa:
1. Browser Console'ni oching (F12)
2. Network tab'da API request'larni ko'ring
3. Terminal log'larini tekshiring
4. Error message'larni o'qing va ularni hal qiling

**Muvaffaqiyatlar! 🎉**

