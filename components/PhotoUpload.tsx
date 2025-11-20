"use client";

import { useState, useRef } from "react";
import { isValidImageType, isValidImageSize } from "@/lib/validation";

interface PhotoUploadProps {
  onFileSelect: (file: File | null) => void;
  currentFile?: File | null;
}

export default function PhotoUpload({ onFileSelect, currentFile }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (!file) {
      onFileSelect(null);
      setPreview(null);
      return;
    }

    if (!isValidImageType(file)) {
      setError("Please select a valid image (JPG, PNG, or WEBP)");
      onFileSelect(null);
      setPreview(null);
      return;
    }

    if (!isValidImageSize(file)) {
      setError("Image size must be less than 5MB");
      onFileSelect(null);
      setPreview(null);
      return;
    }

    onFileSelect(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onFileSelect(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Photo (optional)
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        id="photo-upload"
      />
      <label
        htmlFor="photo-upload"
        className="block w-full px-4 py-2 rounded-lg border border-stone-brown/30 bg-white-smoke text-black cursor-pointer hover:bg-dusty-taupe/10 transition-colors text-center"
      >
        Choose Photo
      </label>
      
      {error && (
        <p className="mt-2 text-sm text-night-bordeaux">{error}</p>
      )}

      {preview && (
        <div className="mt-4 relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-night-bordeaux text-white-smoke rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-black"
          >
            ×
          </button>
          {currentFile && (
            <p className="mt-2 text-xs text-stone-brown truncate">
              {currentFile.name}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

