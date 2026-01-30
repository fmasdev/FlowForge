// src/components/toggle-button/ToggleButton.types.ts

export type ToggleButtonProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  labelClassName?: string;
  id?: string;
};