# ใช้ Node.js เป็น Base Image
FROM node:18-alpine

# Set environment variables (place them on top)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_KEY
ARG DATABASE_URL
ARG DIRECT_URL
ARG JWT_SECRET
ARG NEXTAUTH_SECRET

ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-https://yynfzvxxyvivwcpcvvzk.supabase.co}
ENV NEXT_PUBLIC_SUPABASE_KEY=${NEXT_PUBLIC_SUPABASE_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV DIRECT_URL=${DIRECT_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Internal Supabase URL for backend use
ENV SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV SUPABASE_KEY=${NEXT_PUBLIC_SUPABASE_KEY}


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