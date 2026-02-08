// src/components/Toast/ToastProvider.tsx

'use client';

import { useState, ReactNode, useContext, createContext } from 'react';
import { ToastStack } from '@/components/toast/ToastStack';
import type { ToastContextValue, ToastItem, ToastPosition, ToastType } from '@/components/toast/Toast.type';

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode; position?: ToastPosition }> = ({
  children,
  position = 'bottom-right',
}) => {
  const [Toasts, setToasts] = useState<ToastItem[]>([]);

  // simple compteur pour id
  const [nextId, setNextId] = useState(1);

  const toastify = (type: ToastType, message: string) => {
    const id = nextId;
    setNextId((prev) => prev + 1);

    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto-dismiss after 5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toastify }}>
      {children}
      <ToastStack toasts={Toasts} onClose={removeToast} position={position} />
    </ToastContext.Provider>
  );
};

// Hook easy for use
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};