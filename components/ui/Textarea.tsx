import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({ label, className = "", ...props }: TextareaProps) {
  const textareaClasses = "input w-full min-h-[200px] resize-y " + className;

  if (label) {
    return (
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          {label}
        </label>
        <textarea className={textareaClasses} {...props} />
      </div>
    );
  }

  return <textarea className={textareaClasses} {...props} />;
}

