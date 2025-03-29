import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const favourites = await prisma.wishlist.findMany({
      where: { user: { email } },
      include: {
        book: true,
      },
    });

    if (!favourites || favourites.length === 0) {
      return NextResponse.json(
        { error: "No favourites found for this user" },
        { status: 404 }
      );
    }

    favourites.forEach((item) => {
      if (!item.book) {
        console.error("Missing book data:", item);
      }
    });

    return NextResponse.json({ favourites }, { status: 200 });
  } catch (error) {
    console.error("Error fetching favourites:", error);
    return NextResponse.json(
      { error: "Error fetching favourites" },
      { status: 500 }
    );
  }
}
