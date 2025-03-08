import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log(email, password);
    // Find the user by userId
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword, // Update the password
      },
    });

    return NextResponse.json(
      { message: "Password successfully updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Change password error: ", error.message);
    } else {
      console.error("Unknown Change password error: ", error);
    }
    return NextResponse.json(
      { error: "An error occurred while changing password" },
      { status: 500 }
    );
  }
}
