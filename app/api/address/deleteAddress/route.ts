import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
export async function POST(req: Request) {
  try {
    const { userId, addressToDelete } = await req.json();

    if (!userId || !addressToDelete) {
      return NextResponse.json(
        { message: "User ID and address to delete are required!" },
        { status: 400 }
      );
    }

    // Fetch the current addresses
    const user = await prisma.user.findUnique({
      where: { userId: userId },
      select: { address: true },
    });

    if (!user || !user.address) {
      return NextResponse.json(
        { message: "User or addresses not found!" },
        { status: 404 }
      );
    }

    // Remove the address
    const updatedAddresses = user.address
      .split(";")
      .filter((address: string) => address.trim() !== addressToDelete)
      .join(";");

    await prisma.user.update({
      where: { userId: userId },
      data: { address: updatedAddresses },
    });

    return NextResponse.json(
      { message: "Address deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
