// src/components/Toast.tsx

'use client';

import { JSX } from 'react';
import { SvgIcon } from '@/components/SvgIcon';
import { ToastProps, ToastType } from '@/components/toast/Toast.type';

const typeStyles: Record<ToastType, { bg: string; icon: ToastType; iconColor: string }> = {
  info: {
    bg: 'bg-blue-100 text-blue-900',
    icon: 'info',
    iconColor: 'text-blue-600',
  },
  success: {
    bg: 'bg-green-100 text-green-900',
    icon: 'success',
    iconColor: 'text-green-600',
  },
  error: {
    bg: 'bg-red-100 text-red-900',
    icon: 'error',
    iconColor: 'text-red-600',
  },
};

export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  onClose
}): JSX.Element => {
  const { bg, icon, iconColor } = typeStyles[type];

  return (
    <div
      className={`${bg} flex items-center gap-2 rounded-md px-4 py-2 shadow-lg max-w-xs transition-all duration-300 ease-out`}
    >
      <SvgIcon name={icon} className={`w-5 h-5 ${iconColor}`} />

      <span className="text-gray-800 text-sm flex-1">{message}</span>

      <button
        type="button"
        onClick={onClose}
        className="text-gray-500 hover:text-gray-800 font-bold text-lg"
        aria-label="Close Toast"
      >
        ×
      </button>
    </div>
  );
};
