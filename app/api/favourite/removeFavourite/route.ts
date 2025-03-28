import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, bookId } = await req.json();

    if (!userId || !bookId) {
      return NextResponse.json(
        { message: "userId and bookId are required", status: "fail" },
        { status: 400 }
      );
    }

    await prisma.wishlist.delete({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId,
        },
      },
    });

    return NextResponse.json(
      { message: "Book removed from wishlist", status: "success" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Book is not in the wishlist", status: "fail" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error", status: "error" },
      { status: 500 }
    );
  }
}
