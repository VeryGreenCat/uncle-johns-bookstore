import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // ค้นหา order ที่ active อยู่ของ user
    let order = await prisma.order.findFirst({
      where: { userId, active: true },
      select: { orderId: true },
    });

    // ถ้ายังไม่มี order ที่ active ให้สร้างใหม่
    if (!order) {
      order = await prisma.order.create({
        data: {
          userId,
          orderDate: new Date(),
          price: 0,
          active: true,
          receiveConfirmed: false,
        },
        select: { orderId: true },
      });
    }

    return NextResponse.json({ orderId: order.orderId });
  } catch (error) {
    console.error("Error fetching or creating order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
