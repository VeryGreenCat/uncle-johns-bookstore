import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/utils/shareFunc";

export async function POST(req: NextRequest) {
  try {
  // ตรวจสอบข้อมูลที่รับเข้ามา
  console.log("Request body:", req.body);

  const { userEmail, addressName, addressDetail, subDistrict, district, province, postalCode } = await req.json();

  if (!userEmail) {
    throw new Error("User email is required");
  }

  const userId = await getUserId(userEmail);
  console.log("User ID:", userId); // ตรวจสอบว่าได้ userId ถูกต้องหรือไม่

  if (!userId) {
    throw new Error("User not found");
  }

  // ดำเนินการเพิ่มที่อยู่
  // ... (โค้ดที่เกี่ยวข้องกับการอัปเดตที่อยู่)
  
} catch (error) {
  console.error("Error in addAddress:", error.message);
  return NextResponse.json({ error: error.message }, { status: 500 });
}
}
