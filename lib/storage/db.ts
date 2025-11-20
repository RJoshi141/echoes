import { promises as fs } from "fs";
import path from "path";
import { User, Letter } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const LETTERS_FILE = path.join(DATA_DIR, "letters.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

// Read users from file
async function readUsers(): Promise<User[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write users to file
async function writeUsers(users: User[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

// Read letters from file
async function readLetters(): Promise<Letter[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(LETTERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write letters to file
async function writeLetters(letters: Letter[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(LETTERS_FILE, JSON.stringify(letters, null, 2), "utf-8");
}

// User operations
export async function createUser(email: string): Promise<User> {
  const users = await readUsers();
  const user: User = {
    id: crypto.randomUUID(),
    email,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeUsers(users);
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readUsers();
  return users.find((u) => u.email === email) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await readUsers();
  return users.find((u) => u.id === id) || null;
}

// Letter operations
export async function createLetter(letter: Omit<Letter, "id" | "createdAt">): Promise<Letter> {
  const letters = await readLetters();
  const newLetter: Letter = {
    ...letter,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  letters.push(newLetter);
  await writeLetters(letters);
  return newLetter;
}

export async function getLettersByUserId(userId: string): Promise<Letter[]> {
  const letters = await readLetters();
  return letters.filter((l) => l.userId === userId);
}

export async function getLetterById(id: string): Promise<Letter | null> {
  const letters = await readLetters();
  return letters.find((l) => l.id === id) || null;
}

export async function getDueLetters(): Promise<Letter[]> {
  const letters = await readLetters();
  const now = new Date().toISOString();
  return letters.filter(
    (l) => l.deliveryDate <= now && l.status === "scheduled"
  );
}

export async function updateLetterStatus(id: string, status: Letter["status"]): Promise<Letter | null> {
  const letters = await readLetters();
  const letter = letters.find((l) => l.id === id);
  if (!letter) return null;
  letter.status = status;
  await writeLetters(letters);
  return letter;
}

