import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // ดึงข้อมูลหนังสือพร้อมกับข้อมูลหมวดหมู่
    const books = await prisma.book.findMany({
      select: {
        bookId: true,
        name: true,
        author: true,
        price: true,
        discount: true,
        quantity: true,
        publisher: true,
        rating: true,
        bookDetails: true,
        imageURL: true,
        categoryId: true,
        category: {
          // Include category data
          select: {
            categoryId: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ books }, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching books" },
      { status: 500 }
    );
  }
}
