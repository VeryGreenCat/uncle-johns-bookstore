// app/api/auth/login/route.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Check if email and password are provided
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email }, // Using email as the unique field
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Compare password with hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT Token
  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { error: "JWT_SECRET is not defined" },
      { status: 500 }
    );
  }
  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Create the response with the token in a secure cookie
  const response = NextResponse.json({ message: "Login successful" });
  const isProduction = process.env.NODE_ENV === "production";
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 3600, // 1 hour
  });

  return response;
}
