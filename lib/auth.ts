import { cookies } from "next/headers";
import { getUserById } from "./storage/db";
import { User } from "@/types";

const SESSION_COOKIE_NAME = "echoes_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionId) {
    return null;
  }
  
  return await getUserById(sessionId);
}

export async function setSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

