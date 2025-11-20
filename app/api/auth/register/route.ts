import { NextRequest, NextResponse } from "next/server";
import { createUserWithPassword } from "@/lib/auth-storage";
import { setSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const user = await createUserWithPassword(email, password);
    await setSession(user.id);

    return NextResponse.json({ user: { id: user.id, email: user.email } });
  } catch (error: any) {
    if (error.message === "User already exists") {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

