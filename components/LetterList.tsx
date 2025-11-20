"use client";

import { Letter } from "@/types";
import Card from "./ui/Card";

interface LetterListProps {
  letters: Letter[];
}

export default function LetterList({ letters }: LetterListProps) {
  if (letters.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <h2 className="text-2xl font-bold text-black mb-2">
          No letters yet
        </h2>
        <p className="text-stone-brown">
          Start writing to your future self!
        </p>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getContentPreview = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="space-y-4">
      {letters.map((letter) => (
        <Card key={letter.id} className="hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium text-black">
                  Delivery: {formatDate(letter.deliveryDate)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    letter.status === "sent"
                      ? "bg-dusty-taupe/30 text-black"
                      : "bg-night-bordeaux/20 text-night-bordeaux"
                  }`}
                >
                  {letter.status === "sent" ? "Sent" : "Scheduled"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    letter.visibility === "private"
                      ? "bg-dusty-taupe/30 text-black"
                      : "bg-white-smoke text-black border border-stone-brown/30"
                  }`}
                >
                  {letter.visibility === "private" ? "Private" : "Public"}
                </span>
              </div>
              <p className="text-black/80 text-sm leading-relaxed">
                {getContentPreview(letter.content)}
              </p>
              {letter.photoUrl && (
                <div className="mt-3">
                  <span className="text-xs text-stone-brown">📷 Photo attached</span>
                </div>
              )}
            </div>
            <div className="text-xs text-stone-brown">
              Created: {formatDate(letter.createdAt)}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

