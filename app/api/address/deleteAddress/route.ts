import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
export async function POST(req: Request) {
  try {
    const { userId, addressToDelete } = await req.json();

    if (!userId || !addressToDelete) {
      return NextResponse.json({ message: "User ID and address to delete are required!" }, { status: 400 });
    }

    // Fetch the current addresses
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { addresses: true },
    });

    if (!user || !user.addresses) {
      return NextResponse.json({ message: "User or addresses not found!" }, { status: 404 });
    }

    // Remove the address
    const updatedAddresses = user.addresses
      .split(";")
      .filter((address) => address.trim() !== addressToDelete)
      .join(";");

    await prisma.user.update({
      where: { id: userId },
      data: { addresses: updatedAddresses },
    });

    return NextResponse.json({ message: "Address deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
