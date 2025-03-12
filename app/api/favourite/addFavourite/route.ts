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

    await prisma.wishlist.create({
      data: { userId, bookId },
    });

    return NextResponse.json(
      { message: "Book added to wishlist", status: "success" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Book is already in wishlist", status: "fail" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error", status: "error" },
      { status: 500 }
    );
  }
}
