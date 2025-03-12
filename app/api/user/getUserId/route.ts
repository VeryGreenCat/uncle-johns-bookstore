import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: NextResponse) {
  try {
    const { userEmail } = await request.json();

    if (!userEmail) {
      return NextResponse.json(
        { error: "Missing userEmail in request body" },
        { status: 400 }
      );
    }

    // Query the database to find the user by email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the userId
    return NextResponse.json(
      { userId: user.userId, message: "User found successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
