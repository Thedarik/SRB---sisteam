# 🎓 EduCRM - O'quv Markazlar uchun CRM Tizimi

O'quv markazlar uchun zamonaviy boshqaruv tizimi. Next.js, TypeScript, Supabase va Tailwind CSS bilan qurilgan.

## ✨ Xususiyatlar

- 📊 **Dashboard** - Real-time statistika va tahlil
- 👥 **O'quvchilar Boshqaruvi** - To'liq CRUD operatsiyalar
- 💰 **Moliyaviy Modul** - To'lovlar va daromad nazorati
- 📅 **Davomad Tizimi** - Kunlik va haftalik davomad
- 📈 **Hisobotlar** - Excel/PDF export
- 💬 **SMS Yuborish** - Eskiz.uz integratsiyasi (keyinchalik)

## 🚀 Texnologiyalar

- **Frontend:** Next.js 15, React 19, TypeScript
- **UI:** Tailwind CSS, Shadcn/ui, Framer Motion
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth

## 📋 O'rnatish

### 1. Repository'ni clone qiling:

\`\`\`bash
git clone https://github.com/Thedarik/SRB---sisteam.git
cd SRB---sisteam
cd globe-component
\`\`\`

### 2. Dependencies o'rnating:

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### 3. Environment variables sozlang:

\`.env.local\` fayl yarating (proyekt root papkasida):

\`\`\`env
# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Anon Key (Browser uchun xavfsiz)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase Service Role Key (MUHIM! Maxfiy saqlang!)
# Bu key RLS'ni bypass qiladi va faqat server-side ishlatiladi
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
\`\`\`

**⚠️ DIQQAT:** 
- \`SUPABASE_SERVICE_ROLE_KEY\` ni hech qachon browser'ga yubormang!
- Bu key faqat API routes'da ishlatiladi
- Supabase Dashboard → Settings → API'dan topishingiz mumkin

### 4. Database setup:

Supabase Dashboard'da \`supabase-schema.sql\` faylini ishga tushiring.

### 5. Ishga tushiring:

\`\`\`bash
npm run dev
\`\`\`

Brauzerda: \`http://localhost:3000\`

## 📚 Database Schema

- \`students\` - O'quvchilar
- \`groups\` - Guruhlar
- \`payments\` - To'lovlar
- \`attendance\` - Davomad
- \`sms_logs\` - SMS tarixi

## 🔐 Login Ma'lumotlari

- **Admin:** admin login
- **Super Admin:** super admin login

## 🔧 Muammolarni Hal Qilish

### ❌ "500 Internal Server Error" o'quvchi qo'shganda

**Sabab:** Service Role Key to'g'ri sozlanmagan

**Yechim:**
1. \`.env.local\` faylida \`SUPABASE_SERVICE_ROLE_KEY\` mavjudligini tekshiring
2. Supabase Dashboard → Settings → API → service_role key'ni nusxalang
3. Server'ni to'xtatib qaytadan ishga tushiring (\`npm run dev\`)

### ❌ Guruhlar dropdown'da ko'rinmayapti

**Yechim:**
1. Supabase SQL Editor'da query bajaring:
   \`\`\`sql
   SELECT * FROM groups WHERE status = 'active';
   \`\`\`
2. Agar bo'sh bo'lsa, \`supabase-schema.sql\`dagi sample data'ni qo'shing
3. Browser'ni yangilang

### ❌ "Row Level Security" xatosi

**Yechim:**
- API route'lar \`supabaseAdmin\` ishlatayotganligini tekshiring
- \`SUPABASE_SERVICE_ROLE_KEY\` o'rnatilganligini tasdiqlang

Batafsil yo'riqnoma: \`SETUP-GUIDE.md\` faylini o'qing

## 🤝 Contributing

Pull requests are welcome!

## 📝 License

MIT

## 👨‍💻 Muallif

Thedarik

## 📞 Aloqa

GitHub: [@Thedarik](https://github.com/Thedarik)



