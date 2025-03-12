import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const { userId, bookId } = await req.json();

    // ตรวจสอบว่า email และ bookId ถูกส่งมาหรือไม่
    if (!userId || !bookId) {
      return NextResponse.json(
        { error: "Missing userId or bookId" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ตรวจสอบสถานะ favorite ในฐานข้อมูล
    const favorite = await prisma.wishlist.findUnique({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId, // bookId ที่ได้รับจาก client
        },
      },
    });
    return NextResponse.json({ isFavorite: !!favorite }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Check book error: ", error.message); // Log the error message if it's an instance of Error
    } else {
      console.error("Unknown check book error: ", error); // For non-Error objects
    }
    return NextResponse.json(
      { error: "An error occurred during route check book" },
      { status: 500 }
    );
  }
}
