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
      imageURL,
      categoryId,
    } = await req.json();

    const book = await prisma.book.update({
      where: { bookId},
      data: {
        bookId,
        name,
        author,
        publisher,
        bookDetails,
        price,
        discount,
        quantity,
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
