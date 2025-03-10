import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      surname,
      email,
      birthday,
      gender,
      phoneNumber,
      currentEmail,
    } = await req.json();

    // เช็คว่าอีเมลใหม่ถูกเปลี่ยนหรือไม่
    if (email !== currentEmail) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email is already in use." },
          { status: 400 }
        );
      }
    }

    const parsedBirthday = new Date(birthday); // Convert birthday to Date object
    parsedBirthday.setDate(parsedBirthday.getDate() + 1);
    if (isNaN(parsedBirthday.getTime())) {
      return NextResponse.json(
        { error: "Invalid birthday format" },
        { status: 400 }
      );
    }

    // Check if birthday is not in the future
    const currentDate = new Date();
    const userBirthday = new Date(parsedBirthday);

    if (userBirthday > currentDate) {
      return NextResponse.json(
        { error: "Birthday cannot be in the future." },
        { status: 400 }
      );
    }

    // Assuming you have the user's session and user ID
    const updatedUser = await prisma.user.update({
      where: { email }, // or use `where: { id: userId }` based on session or user context
      data: {
        name,
        surname,
        email,
        birthday: parsedBirthday,
        gender,
        phoneNumber,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully.", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile.", error);
    return NextResponse.json(
      { error: "An error occurred while updating the profile." },
      { status: 500 }
    );
  }
}
