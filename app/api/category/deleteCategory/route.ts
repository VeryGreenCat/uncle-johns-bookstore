import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function DELETE(req: NextRequest) {
  try {
    const { name } = await req.json();

    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    await prisma.category.delete({
      where: { name },
    });

    return NextResponse.json(
      { message: "Category deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Delete category error: ", error.message);
    } else {
      console.error("Unknown delete category error: ", error);
    }
    return NextResponse.json(
      { error: "An error occurred while deleting the category" },
      { status: 500 }
    );
  }
}
