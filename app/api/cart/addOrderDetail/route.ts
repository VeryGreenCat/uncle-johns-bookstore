import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, orderId, bookId, quantity, price } = await req.json();
    console.log("Received data:", { userId, orderId, bookId, quantity, price });
    if (!userId || !orderId || !bookId || !quantity || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ตรวจสอบว่า order ที่ให้มามีอยู่จริงและเป็นของ user นี้
    const order = await prisma.order.findUnique({
      where: { orderId },
    });

    if (!order || order.userId !== userId) {
      return NextResponse.json(
        { error: "Order not found or unauthorized" },
        { status: 404 }
      );
    }

    // ตรวจสอบว่า bookId นี้มีอยู่ใน orderDetail ของ orderId นี้หรือไม่
    const existingOrderDetail = await prisma.orderDetail.findFirst({
      where: { orderId, bookId },
    });

    if (existingOrderDetail) {
      return NextResponse.json({ message: "สินค้านี้ถูกเพิ่มเข้าตะกร้าไปแล้ว" }, { status: 400 });
    }

    // เพิ่ม OrderDetail ใหม่
    const orderDetail = await prisma.orderDetail.create({
      data: {
        orderId,
        bookId,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      },
    });

    return NextResponse.json({
      message: "เพิ่มเข้าตะกร้าสำเร็จ",
      orderDetail,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Add order detail error: ", error.message);
    } else {
      console.error("Unknown add order detail error: ", error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
