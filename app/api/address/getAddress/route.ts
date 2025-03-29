import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "User email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { address: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.address) {
      return NextResponse.json({ address: "" }, { status: 200 });
    }

    return NextResponse.json({ address: user.address }, { status: 200 });
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json(
      { message: "Internal server error fetching address" },
      { status: 500 }
    );
  }
}
