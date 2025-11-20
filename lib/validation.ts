export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isFutureDate(date: string): boolean {
  const selectedDate = new Date(date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return selectedDate > now;
}

export function isValidImageType(file: File): boolean {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  return validTypes.includes(file.type);
}

export function isValidImageSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

export function validateLetter(content: string, deliveryDate: string, emailTo: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!content.trim()) {
    errors.push("Letter content cannot be empty");
  }

  if (!deliveryDate) {
    errors.push("Please select a delivery date");
  } else if (!isFutureDate(deliveryDate)) {
    errors.push("Delivery date must be in the future");
  }

  if (!emailTo) {
    errors.push("Email address is required");
  } else if (!isValidEmail(emailTo)) {
    errors.push("Please enter a valid email address");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

