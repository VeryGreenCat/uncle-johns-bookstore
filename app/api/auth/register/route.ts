// app/api/auth/regis/route.ts

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: Request) {
  try {
    const { name, surname, email, password } = await req.json();

    if (!name || !surname || !password) {
      return NextResponse.json(
        { error: "Name, surname, and password are required" },
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

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        birthday: new Date(), // Replace with actual birthday value
        gender: "Not specified", // Replace with actual gender value
        phoneNumber: "000-000-0000", // Replace with actual phone number value
      },
    });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
