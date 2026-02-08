// src/components/toast/ToastStack.tsx

import { Toast } from "@/components/toast/Toast";
import { ToastPosition, ToastStackProps } from "@/components/toast/Toast.type";
import { ToastItem } from "@/components/toast/Toast.type";

const positionStyles: Record<ToastPosition, string> = {
  'bottom-right': 'fixed bottom-4 right-4',
  'bottom-left': 'fixed bottom-4 left-4',
  'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2',
};

export const ToastStack: React.FC<ToastStackProps> = ({
  toasts,
  position = 'bottom-right',
  onClose,
}) => {
  return (
    <div className={`${positionStyles[position]} flex flex-col-reverse gap-2 z-50`}>
      {toasts.map((toast: ToastItem) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  );
};
