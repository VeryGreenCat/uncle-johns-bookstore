import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function PUT(req: NextRequest) {
  try {
    const { oldName, newName } = await req.json(); 
    if (!oldName || !newName) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }
    const existingCategory = await prisma.category.findUnique({
      where: { name: oldName },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    const duplicateCategory = await prisma.category.findUnique({
      where: { name: newName },
    });

    if (duplicateCategory) {
      return NextResponse.json(
        { error: "This category name is already in use" },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { name: oldName },
      data: { name: newName },
    });

    return NextResponse.json(
      { message: "Category updated successfully!", category: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "An error occurred while updating category." },
      { status: 500 }
    );
  }
}
