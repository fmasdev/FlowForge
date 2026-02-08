// src/components/Toast/Toast.type.ts

import { IconName } from "@/assets/svg";

export type ToastType = 'info' | 'success' | 'error';
export type ToastPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastStyle {
  bg: string;
  icon: IconName;
  iconColor: string;
}

export interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

export interface ToastContextValue {
  toastify: (type: ToastType, message: string) => void;
}

export interface ToastStackProps {
  toasts: ToastItem[];
  onClose: (id: number) => void;
  position?: ToastPosition;
}

export type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
};
