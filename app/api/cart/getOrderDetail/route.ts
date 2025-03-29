import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // 1. ดึง orderId ที่ยัง active
    const order = await prisma.order.findFirst({
      where: { userId, active: true },
      select: { orderId: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: "No active order found" },
        { status: 404 }
      );
    }

    // 2. ดึง orderDetail ทั้งหมดของ orderId นั้น
    const orderDetails = await prisma.orderDetail.findMany({
      where: { orderId: order.orderId },
      select: {
        bookId: true,
        quantity: true,
        book: {
          select: {
            name: true,
            price: true,
            discount: true, // Add discount field here
          },
        },
      },
    });

    // 3. คำนวณราคาทั้งหมด
    const items = orderDetails.map((detail) => ({
      bookId: detail.bookId,
      name: detail.book.name,
      quantity: detail.quantity,
      price: Math.ceil(
        detail.book.price -
          (detail.book.price * (detail.book.discount ?? 0)) / 100
      ), // Change made here
      pricePerDetail:
        detail.quantity *
        Math.ceil(
          detail.book.price -
            (detail.book.price * (detail.book.discount ?? 0)) / 100
        ), // Change made here
    }));

    return NextResponse.json(
      {
        orderId: order.orderId,
        items: items,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cart details:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching cart details" },
      { status: 500 }
    );
  }
}
