import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function updateOrderDetail(request: NextRequest) {
  try {
    const { orderId, updatedItems } = await request.json();

    if (!orderId || !Array.isArray(updatedItems)) {
      return NextResponse.json(
        { error: "Order ID and updated items are required" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      const updatePromises = updatedItems.map((item) =>
        tx.orderDetail.update({
          where: { orderId_bookId: { orderId, bookId: item.bookId } },
          data: { quantity: item.quantity, price: item.price },
        })
      );

      await Promise.all(updatePromises);
    });

    return NextResponse.json(
      { message: "Order details updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order details:", error);
    return NextResponse.json(
      { error: "An error occurred while updating order details" },
      { status: 500 }
    );
  }
}
