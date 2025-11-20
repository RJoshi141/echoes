import { NextResponse } from "next/server";
import { getDueLetters, updateLetterStatus } from "@/lib/storage/db";

// This endpoint is designed to be called by a cron job
// It finds all letters that are due and marks them as sent
// In production, you would also send actual emails here
export async function GET() {
  try {
    const dueLetters = await getDueLetters();
    
    // Mark each letter as sent
    for (const letter of dueLetters) {
      await updateLetterStatus(letter.id, "sent");
      // TODO: In production, send email here
      // await sendEmail(letter.emailTo, letter.content, letter.photoUrl);
    }

    return NextResponse.json({
      success: true,
      sent: dueLetters.length,
      letters: dueLetters,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process due letters" },
      { status: 500 }
    );
  }
}

