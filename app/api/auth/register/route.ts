// app/api/auth/regis/route.ts
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

// register
export async function POST(req: Request) {
  try {
    const { name, surname, email, password, birthday, gender, phoneNumber } =
      await req.json();

    // Validate required fields
    if (
      !name ||
      !surname ||
      !email ||
      !password ||
      !birthday ||
      !gender ||
      !phoneNumber
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert birthday to Date object
    const parsedBirthday = new Date(birthday);
    parsedBirthday.setDate(parsedBirthday.getDate() + 1);
    if (isNaN(parsedBirthday.getTime())) {
      return NextResponse.json(
        { error: "Invalid birthday format" },
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
      },
    });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message if it's an instance of Error
    } else {
      console.error("Unknown error occurred", error); // For non-Error objects
    }

    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
