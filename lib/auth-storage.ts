import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "./storage/db";

// In-memory store for password hashes (in production, this would be in the database)
// Format: { userId: hashedPassword }
const passwordStore: Record<string, string> = {};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUserWithPassword(email: string, password: string) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  
  const user = await createUser(email);
  const hashedPassword = await hashPassword(password);
  passwordStore[user.id] = hashedPassword;
  
  return user;
}

export async function verifyUserPassword(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) {
    return null;
  }
  
  const hashedPassword = passwordStore[user.id];
  if (!hashedPassword) {
    return null;
  }
  
  const isValid = await verifyPassword(password, hashedPassword);
  if (!isValid) {
    return null;
  }
  
  return user;
}

