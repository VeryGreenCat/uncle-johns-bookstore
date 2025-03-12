import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { bookId } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: "Missing bookId" }, { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: { bookId },
      include: {
        category: {
          select: {
            categoryId: true,
            name: true,
          },
        },
      },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ book }, { status: 200 });
  } catch (error) {
    console.error("Error fetching book details:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching book details" },
      { status: 500 }
    );
  }
}
