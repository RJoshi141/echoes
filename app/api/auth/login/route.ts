import { NextRequest, NextResponse } from "next/server";
import { verifyUserPassword } from "@/lib/auth-storage";
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

    const user = await verifyUserPassword(email, password);
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    await setSession(user.id);

    return NextResponse.json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}

