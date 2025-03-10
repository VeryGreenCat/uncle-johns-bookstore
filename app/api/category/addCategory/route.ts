import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    const existingCategory = await prisma.category.findUnique({
      where: { name }, // Check if user already exists
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "This category is already in use" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json(
      { message: "Add category successful!", category },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Add category error. ", error.message); // Log the error message if it's an instance of Error
    } else {
      console.error("Unknown add category error. ", error); // For non-Error objects
    }
    return NextResponse.json(
      { error: "An error occurred during route add category," },
      { status: 500 }
    );
  }
}
