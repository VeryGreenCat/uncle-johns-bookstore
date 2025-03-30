import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      // คำนวณ total price ใหม่
      const orderDetails = await tx.orderDetail.findMany({
        where: { orderId },
        select: { price: true },
      });

      const totalPrice = orderDetails.reduce(
        (sum, detail) => sum + detail.price,
        0
      );

      // อัปเดต order
      await tx.order.update({
        where: { orderId },
        data: {
          orderDate: new Date(),
          price: totalPrice,
          active: false,
        },
      });
    });

    return NextResponse.json(
      { message: "Order confirmed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error confirming order:", error);
    return NextResponse.json(
      { error: "An error occurred while confirming order" },
      { status: 500 }
    );
  }
}
