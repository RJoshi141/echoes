"use client";

import { Visibility } from "@/types";

interface VisibilityToggleProps {
  value: Visibility;
  onChange: (value: Visibility) => void;
}

export default function VisibilityToggle({ value, onChange }: VisibilityToggleProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Visibility
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange("private")}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            value === "private"
              ? "bg-night-bordeaux text-white-smoke"
              : "bg-dusty-taupe/30 text-black hover:bg-dusty-taupe/50"
          }`}
        >
          Private
        </button>
        <button
          type="button"
          onClick={() => onChange("public_anonymous")}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            value === "public_anonymous"
              ? "bg-night-bordeaux text-white-smoke"
              : "bg-dusty-taupe/30 text-black hover:bg-dusty-taupe/50"
          }`}
        >
          Public but anonymous
        </button>
      </div>
    </div>
  );
}

