import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server"; // ใช้ NextRequest และ NextResponse

export async function POST(req: NextRequest) {
  const { orderId } = await req.json(); // รับข้อมูลจาก body

  if (!orderId) {
    return NextResponse.json({ message: "Missing orderId" }, { status: 400 });
  }

  try {
    // ใช้ Prisma อัปเดตค่า receiveConfirmed เป็น true
    const updatedOrder = await prisma.order.update({
      where: { orderId },
      data: { receiveConfirmed: true },
    });

    return NextResponse.json({ success: true, updatedOrder });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update order", error },
      { status: 500 }
    );
  }
}
