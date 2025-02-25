import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req) {
  const { name, surname, password } = await req.json();

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { name },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT Token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Send token in a secure cookie (better than localStorage)
  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, { httpOnly: true, secure: true });

  return response;
}
