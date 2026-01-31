// src/components/toggle-button/ToggleButton.tsx

import { ToggleButtonProps } from "@/components/toggle-button/ToggleButton.types";

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  labelClassName,
  id = 'toggle',
}) => {
  return (
    <label
      htmlFor={id}
      className={`
        inline-flex items-center gap-2
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
    >
      {label && (
        <span className={`text-sm ${labelClassName}`} >{label}</span>
      )}

      <div className="relative">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div
          className={`
            h-6 w-12 rounded-full transition-colors
            bg-gray-300 peer-checked:bg-blue-500
          `}
        />
        <div
          className={`
            absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow
            transition-transform
            peer-checked:translate-x-6
          `}
        />
      </div>
    </label>
  );
};

export default ToggleButton;