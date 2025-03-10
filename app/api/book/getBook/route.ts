import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET() {
  try {
    const book = await prisma.book.findMany();
    return NextResponse.json({ book }, { status: 200 });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching book" },
      { status: 500 }
    );
  }
}
