import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseClasses = "rounded-lg px-6 py-3 font-medium transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "bg-night-bordeaux text-white-smoke hover:bg-black",
    secondary: "bg-dusty-taupe text-black hover:bg-stone-brown hover:text-white-smoke",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

