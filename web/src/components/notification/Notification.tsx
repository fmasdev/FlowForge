// src/components/Notification.tsx

'use client';

import { JSX, useState } from 'react';
import { SvgIcon } from '@/components/SvgIcon';
import { NotificationPosition, NotificationProps, NotificationStyle, NotificationType } from '@/components/notification/Notification.type';

const typeStyles = {
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
  danger: {
    bg: 'bg-red-100 text-red-900',
    icon: 'error',
    iconColor: 'text-red-600',
  },
} satisfies Record<NotificationType, NotificationStyle>;

const positionStyles: Record<NotificationPosition, string> = {
  'bottom-right': 'fixed bottom-4 right-4',
  'bottom-left': 'fixed bottom-4 left-4',
  'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2',
};

export const Notification = ({
  type,
  message,
  position = 'bottom-right',
}: NotificationProps): JSX.Element | null => {
  const [visible, setVisible] = useState(true);
  const { bg, icon, iconColor } = typeStyles[type];

  if (!visible) return null;

  return (
    <div
      className={`${positionStyles[position]} ${bg} flex items-center gap-2 rounded-md px-4 py-2 shadow-lg max-w-xs`}
    >
      <SvgIcon name={icon}
        className={`w-5 h-5 ${iconColor}`}
      />
      <span className="text-gray-800 text-sm">{message}</span>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="text-gray-500 hover:text-gray-800 font-bold text-lg"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};
