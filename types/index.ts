export type Visibility = "private" | "public_anonymous";

export type LetterStatus = "scheduled" | "sent";

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Letter {
  id: string;
  userId: string;
  content: string;
  deliveryDate: string; // ISO string
  createdAt: string; // ISO string
  visibility: Visibility;
  emailTo: string;
  photoUrl?: string;
  status: LetterStatus;
}

