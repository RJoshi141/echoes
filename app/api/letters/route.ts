import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createLetter, getLettersByUserId } from "@/lib/storage/db";
import { validateLetter } from "@/lib/validation";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const letters = await getLettersByUserId(user.id);
    return NextResponse.json({ letters });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch letters" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, deliveryDate, visibility, emailTo, photoUrl } = await request.json();

    // Validate input
    const validation = validateLetter(content, deliveryDate, emailTo);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(", ") },
        { status: 400 }
      );
    }

    const letter = await createLetter({
      userId: user.id,
      content,
      deliveryDate,
      visibility,
      emailTo,
      photoUrl,
      status: "scheduled",
    });

    return NextResponse.json({ letter });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create letter" },
      { status: 500 }
    );
  }
}

