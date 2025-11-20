import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  const inputClasses = "input w-full " + className;

  if (label) {
    return (
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          {label}
        </label>
        <input className={inputClasses} {...props} />
      </div>
    );
  }

  return <input className={inputClasses} {...props} />;
}

