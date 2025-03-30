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

    // 1. ดึง orderId ที่ active = false
    const orders = await prisma.order.findMany({
      where: { userId, active: false },
      select: {
        orderId: true,
        orderDate: true,
        receiveConfirmed: true,
        price: true,
      },
    });
    if (orders.length === 0) {
      return NextResponse.json(
        { error: "No completed orders found" },
        { status: 404 }
      );
    }

    // 2. ดึง orderDetail ทั้งหมดของทุก orderId
    const orderDetails = await prisma.orderDetail.findMany({
      where: { orderId: { in: orders.map((order: any) => order.orderId) } },
      select: {
        bookId: true,
        quantity: true,
        price: true,
        rating: true,
        book: {
          select: {
            name: true,
            price: true,
            discount: true,
            imageURL: true,
          },
        },
        order: {
          select: {
            orderId: true,
            orderDate: true,
            receiveConfirmed: true,
            price: true,
          },
        },
      },
    });
    // 3. คำนวณราคาทั้งหมดและจัดระเบียบข้อมูล
    const items = orderDetails.map((detail: any) => ({
      bookId: detail.bookId,
      name: detail.book.name,
      quantity: detail.quantity,
      price: Math.ceil(
        detail.book.price -
          (detail.book.price * (detail.book.discount ?? 0)) / 100
      ),
      pricePerDetail: detail.price / detail.quantity, // แสดงราคาต่อเล่มที่ซื้อตอนนั้น
      image: detail.book.imageURL,
      rating: detail.rating,
      orderId: detail.order.orderId,
      timestamp: detail.order.orderDate,
      receiveConfirmed: detail.order.receiveConfirmed,
      orderPrice: detail.order.price,
    }));
    return NextResponse.json({ orders: items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching order details" },
      { status: 500 }
    );
  }
}
