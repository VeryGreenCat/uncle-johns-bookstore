import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function DELETE(req: NextRequest) {
  try {
    const { bookId } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: "Missing bookId" }, { status: 400 });
    }

    // ตรวจสอบว่าหนังสือมีอยู่หรือไม่
    const existingBook = await prisma.book.findUnique({
      where: { bookId },
    });

    if (!existingBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // ลบหนังสือ
    await prisma.book.delete({
      where: { bookId },
    });

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete book error: ", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the book" },
      { status: 500 }
    );
  }
}
