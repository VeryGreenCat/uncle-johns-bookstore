import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/utils/shareFunc";

export async function POST(req: NextRequest) {
  try {
    const { userEmail } = await req.json();

    if (!userEmail) {
      return NextResponse.json(
        { message: "userEmail is required", status: "fail" },
        { status: 400 }
      );
    }

    const userId = await getUserId(userEmail);
    if (!userId) {
      return NextResponse.json(
        { message: "User not found", status: "fail" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { userId },
      select: { address: true },
    });

    if (!user || !user.address) {
      return NextResponse.json(
        { message: "No address found", status: "fail" },
        { status: 404 }
      );
    }

    return NextResponse.json({ addresses: user.address, status: "success" });
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json(
      { message: "Internal Server Error", status: "error" },
      { status: 500 }
    );
  }
}
