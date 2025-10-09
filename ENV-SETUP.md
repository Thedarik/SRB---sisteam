# 🔐 Environment Variables Setup

## Tezkor Sozlash

`.env.local` faylini proyekt root papkasida yarating va quyidagilarni kiriting:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Qayerdan Topish Mumkin?

### 1️⃣ Supabase Dashboard'ga Kiring
https://app.supabase.com

### 2️⃣ Loyihangizni Tanlang
Loyihalar ro'yxatidan o'z loyihangizni bosing

### 3️⃣ Settings → API
Chap menyudan "Settings" → "API" ni tanlang

### 4️⃣ Ma'lumotlarni Ko'chirib Oling

#### **Project URL** 
```
URL: https://xxxxxxxxxxxxx.supabase.co
```
→ `.env.local` ga `NEXT_PUBLIC_SUPABASE_URL` sifatida qo'shing

#### **anon public** key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```
→ `.env.local` ga `NEXT_PUBLIC_SUPABASE_ANON_KEY` sifatida qo'shing

#### **service_role** key (Secret!)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```
→ `.env.local` ga `SUPABASE_SERVICE_ROLE_KEY` sifatida qo'shing

---

## ⚠️ Muhim Eslatmalar

### Service Role Key Haqida:

✅ **Foydalanish:**
- Faqat server-side (API routes)
- Row Level Security (RLS) bypass qiladi
- Admin operatsiyalari uchun zarur

❌ **QILMANG:**
- Browser'ga yuklash
- `NEXT_PUBLIC_` prefix qo'shish
- GitHub'ga commit qilish
- Boshqalar bilan bo'lishish

### Xavfsizlik:

1. `.env.local` faylini `.gitignore` ga qo'shing (allaqachon qo'shilgan)
2. Production'da Vercel/Netlify Environment Variables ishlatiladi
3. Service Role Key ni hech qachon client-side kod ishlatmasin

---

## ✅ Tekshirish

Hammasi to'g'ri sozlanganligini tekshirish uchun:

```bash
# 1. Server'ni ishga tushiring
npm run dev

# 2. Browser Console'da (F12) tekshiring
# Agar xatolik bo'lmasa, hammasi tayyor!
```

**Console'da xatolik bormi?**
- `Invalid API key` → ANON_KEY noto'g'ri
- `supabaseUrl required` → URL kiritilmagan
- `500 Error` → SERVICE_ROLE_KEY yo'q yoki noto'g'ri

---

## 🔄 Server'ni Qayta Ishga Tushirish

Environment o'zgaruvchilarini o'zgartirganingizdan keyin:

```bash
# Ctrl+C bilan to'xtating
# Keyin qaytadan ishga tushiring
npm run dev
```

---

## 📋 To'liq Namuna (.env.local)

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================

# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co

# Supabase Anon Key (Public, browser-safe)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY4MDAwMDAwMCwiZXhwIjoxODM3NjgwMDAwfQ.EXAMPLE_KEY_REPLACE_WITH_YOUR_ACTUAL_KEY

# Supabase Service Role Key (SECRET! Server-only!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjgwMDAwMDAwLCJleHAiOjE4Mzc2ODAwMDB9.EXAMPLE_KEY_REPLACE_WITH_YOUR_ACTUAL_KEY

# ============================================
# APPLICATION SETTINGS
# ============================================

NODE_ENV=development
```

---

**Tayyor! 🎉** 

Endi `npm run dev` ishga tushiring va o'quvchi qo'shishga urinib ko'ring.

