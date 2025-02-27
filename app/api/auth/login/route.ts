import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // second-time required fields validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "ไม่พบชื่อผู้ใช้ในระบบ" },
        { status: 404 }
      );
    }

    // Compare password with hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
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
  } catch (error) {
    if (error instanceof Error) {
      console.error("Login error: ", error.message); // Log the error message if it's an instance of Error
    } else {
      console.error("Unknown Login error: ", error); // For non-Error objects
    }

    return NextResponse.json(
      { error: "An error occurred during route Login" },
      { status: 500 }
    );
  }
}
