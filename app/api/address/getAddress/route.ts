import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/utils/shareFunc";

export async function POST(req: NextRequest) {
  try {
    const { userEmail } = await req.json();

    if (!userEmail) {
      throw new Error("User email is required");
    }

    const userId = await getUserId(userEmail);

    if (!userId) {
      throw new Error("User not found");
    }

    // Fetch the user's address
    const user = await prisma.user.findUnique({
      where: { userId },
      select: { address: true },
    });

    if (!user?.address) {
      throw new Error("No address found for this user");
    }

    const addresses = user.address.split(";").map((address: string) => {
      const parts = address.split(" ");
      const addressName = parts[0]; // Assuming the address name is the first part
      return { full: address, name: addressName };
    });

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
