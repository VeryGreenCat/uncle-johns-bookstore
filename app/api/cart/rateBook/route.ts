import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderId, bookId, rating } = await request.json();
    if (!orderId || !bookId || rating === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (rating < 0.5 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 0.5 and 5" },
        { status: 400 }
      );
    }
    // อัพเดตคะแนนใน orderDetail (ล็อกคะแนนที่ให้แล้ว)
    const orderDetail = await prisma.orderDetail.updateMany({
      where: { orderId, bookId, rating: 0 },
      data: { rating },
    });
    if (orderDetail.count === 0) {
      return NextResponse.json(
        { error: "Rating has already been set or order not found" },
        { status: 400 }
      );
    }
    // ดึงคะแนนเดิมของหนังสือเล่มนั้น
    const book = await prisma.book.findUnique({
      where: { bookId },
      select: { rating: true },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // คำนวณค่า EMA ใหม่ alpha = 0.7
    const alpha = 0.7;
    const newRating = book.rating
      ? alpha * rating + (1 - alpha) * book.rating
      : rating;
    // อัพเดตค่า rating ของหนังสือ
    await prisma.book.update({
      where: { bookId },
      data: { rating: newRating },
    });

    return NextResponse.json(
      { message: "Rating updated successfully", newRating },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating rating:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
