import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const { userId, addressName, addressDetails } = await req.json();

    if (!userId || !addressName || !addressDetails) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    // Concatenate the new address string
    const newAddress = `${addressName} ${addressDetails};`;

    // Fetch the current address from the API
    let currentAddress = "";
    try {
      const user = await prisma.user.findUnique({
        where: { userId: userId },
        select: { address: true },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      currentAddress = user.address ?? "";
    } catch (error) {
      console.error("Error fetching address:", error);
      return NextResponse.json(
        { message: "Error fetching address from API" },
        { status: 500 }
      );
    }

    // Update the address by appending the new address
    const updatedAddress = `${currentAddress}${newAddress}`;

    // Update the user's address in the database
    await prisma.user.update({
      where: { userId: userId }, // Ensure 'id' matches the column name in your schema
      data: { address: updatedAddress },
    });

    return NextResponse.json(
      { message: "Address added successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding address:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
