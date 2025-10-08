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

\`.env.local\` fayl yarating:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

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

## 🤝 Contributing

Pull requests are welcome!

## 📝 License

MIT

## 👨‍💻 Muallif

Thedarik

## 📞 Aloqa

GitHub: [@Thedarik](https://github.com/Thedarik)

