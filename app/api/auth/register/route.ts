import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const { name, surname, email, password, birthday, gender, phoneNumber } =
      await req.json();

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const parsedBirthday = new Date(birthday); // Convert birthday to Date object
    parsedBirthday.setDate(parsedBirthday.getDate() + 1);
    if (isNaN(parsedBirthday.getTime())) {
      return NextResponse.json(
        { error: "Invalid birthday format" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }, // Check if user already exists
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
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
    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        birthday: parsedBirthday,
        gender,
        phoneNumber,
        role: "user",
      },
    });
    return NextResponse.json({ message: "Registration successful!", user });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Registration error: ", error.message); // Log the error message if it's an instance of Error
    } else {
      console.error("Unknown Registration error: ", error); // For non-Error objects
    }
    return NextResponse.json(
      { error: "An error occurred during route registration" },
      { status: 500 }
    );
  }
}
