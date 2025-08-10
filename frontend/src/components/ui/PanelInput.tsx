import { InputHTMLAttributes } from "react";

interface PanelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function PanelInput({ label, ...props }: PanelInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium" htmlFor={props.id || props.name}>{label}</label>
      <input
        className="w-full border rounded px-3 py-2 bg-background text-foreground focus:outline-none"
        {...props}
      />
    </div>
  );
} 