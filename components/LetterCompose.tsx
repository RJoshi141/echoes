"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Visibility } from "@/types";
import { validateLetter } from "@/lib/validation";
import DeliveryPresets from "./DeliveryPresets";
import VisibilityToggle from "./VisibilityToggle";
import PhotoUpload from "./PhotoUpload";
import Input from "./ui/Input";
import Button from "./ui/Button";

const INSPIRATION_PROMPTS = [
  "What are your biggest dreams right now?",
  "What challenges are you facing, and how do you hope to overcome them?",
  "What would you tell your future self about this moment?",
  "What are you grateful for today?",
  "What do you hope has changed in your life?",
];

interface LetterComposeProps {
  userEmail: string;
}

export default function LetterCompose({ userEmail }: LetterComposeProps) {
  const [content, setContent] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("private");
  const [emailTo, setEmailTo] = useState(userEmail);
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successDeliveryDate, setSuccessDeliveryDate] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setEmailTo(userEmail);
  }, [userEmail]);

  const handleInspire = () => {
    const prompt = INSPIRATION_PROMPTS[Math.floor(Math.random() * INSPIRATION_PROMPTS.length)];
    setContent((prev) => (prev ? `${prev}\n\n${prompt}` : `Dear Future Me,\n\n${prompt}`));
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    const validation = validateLetter(content, deliveryDate, emailTo);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      let photoUrl: string | undefined;
      if (photo) {
        photoUrl = await convertFileToBase64(photo);
      }

      const response = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          deliveryDate,
          visibility,
          emailTo,
          photoUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors([data.error || "Failed to create letter"]);
        setLoading(false);
        return;
      }

      setSuccessDeliveryDate(deliveryDate);
      setSuccess(true);
      setContent("");
      setDeliveryDate("");
      setPhoto(null);
      setErrors([]);

      // Reset form after showing success
      setTimeout(() => {
        setSuccess(false);
        setSuccessDeliveryDate("");
      }, 5000);
    } catch (error) {
      setErrors(["Something went wrong. Please try again."]);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="col-span-1 lg:col-span-2 card text-center">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-black mb-2">
          Your echo has been saved for the future ✨
        </h2>
        <p className="text-stone-brown mb-6">
          Your letter will be delivered on {successDeliveryDate ? new Date(successDeliveryDate).toLocaleDateString() : "the selected date"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.push("/letters")}>
            View your scheduled letters
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setSuccess(false);
              setSuccessDeliveryDate("");
              setContent("");
              setDeliveryDate("");
              setPhoto(null);
            }}
          >
            Write another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {errors.length > 0 && (
        <div className="col-span-1 lg:col-span-2 bg-night-bordeaux/10 border border-night-bordeaux/30 rounded-lg p-4">
          <ul className="list-disc list-inside space-y-1 text-night-bordeaux text-sm">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left: Editor Card */}
        <div className="card">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Dear Future Me,"
              className="input w-full min-h-[400px] sm:min-h-[500px] resize-y text-black placeholder:text-dusty-taupe"
              required
            />
            <button
              type="button"
              onClick={handleInspire}
              className="absolute bottom-4 right-4 button-secondary text-sm py-2 px-4 z-10"
            >
              Inspire me
            </button>
          </div>
        </div>

        {/* Right: Controls Column */}
        <div className="space-y-4 sm:space-y-6">
          <DeliveryPresets onSelect={setDeliveryDate} selectedDate={deliveryDate} />

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Or choose a custom date
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="input w-full"
            />
          </div>

          <VisibilityToggle value={visibility} onChange={setVisibility} />

          <Input
            label="Deliver to email"
            type="email"
            value={emailTo}
            onChange={(e) => setEmailTo(e.target.value)}
            required
            placeholder="your@email.com"
          />

          <PhotoUpload onFileSelect={setPhoto} currentFile={photo} />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send to the Future"}
          </Button>
        </div>
      </form>
    </>
  );
}

