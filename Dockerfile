# ใช้ Node.js เป็น Base Image
FROM node:18-alpine

# Set environment variables (place them on top)
ENV SUPABASE_URL=https://kcshzfsfcfotmvkwgoqm.supabase.co

ENV SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjc2h6ZnNmY2ZvdG12a3dnb3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDc0OTgsImV4cCI6MjA1NTgyMzQ5OH0.kBiEbglHdIIdAfyJSL7TSRYHZNWZIMrhSfSuO3dnaLo

ENV DATABASE_URL="postgresql://postgres.kcshzfsfcfotmvkwgoqm:1FDu7eY6GDIuIjaL@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

ENV DIRECT_URL="postgresql://postgres.kcshzfsfcfotmvkwgoqm:1FDu7eY6GDIuIjaL@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

ENV JWT_SECRET=f0ba59d59a97893b8320db8901f387b034bcf21296f47bcf3c0d6e672ec18d68c1a4b8bb2f6d54c65c98a5ba205ad8de4

ENV NEXTAUTH_SECRET="ZMvkzodg/a2GzttBsrkVfXRQuzE7Mq+Z6QuuPsn"

ENV NEXT_PUBLIC_SUPABASE_URL=https://kcshzfsfcfotmvkwgoqm.supabase.co

ENV NEXT_PUBLIC_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjc2h6ZnNmY2ZvdG12a3dnb3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDc0OTgsImV4cCI6MjA1NTgyMzQ5OH0.kBiEbglHdIIdAfyJSL7TSRYHZNWZIMrhSfSuO3dnaLo


# ตั้งค่า Working Directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package.json package-lock.json ./

# ติดตั้ง Dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# รัน Prisma Migrations (ถ้าใช้ Database)
RUN npx prisma generate

# สร้างไฟล์ Build ของ Next.js
RUN npm run build

# เปิดพอร์ตสำหรับ Next.js
EXPOSE 3000

# คำสั่งเริ่มรันเซิร์ฟเวอร์
CMD ["npm", "run", "start"]