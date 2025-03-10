import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const {
      bookId,
      name,
      author,
      publisher,
      bookDetails,
      price,
      discount,
      quantity,
      rating,
      imageURL,
      categoryId,
    } = await req.json();

    const existingBook = await prisma.book.findUnique({
      where: { bookId }, // Check if user already exists
    });

    if (existingBook) {
      return NextResponse.json(
        { error: "This bookId is already in use" },
        { status: 400 }
      );
    }

    const book = await prisma.book.create({
      data: {
        bookId,
        name,
        author,
        publisher,
        bookDetails,
        price,
        discount,
        quantity,
        rating,
        imageURL,
        categoryId,
      },
    });

    return NextResponse.json(
      { message: "Add book successful!", book },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Add book error: ", error.message); // Log the error message if it's an instance of Error
    } else {
      console.error("Unknown add book error: ", error); // For non-Error objects
    }
    return NextResponse.json(
      { error: "An error occurred during route add book" },
      { status: 500 }
    );
  }
}
