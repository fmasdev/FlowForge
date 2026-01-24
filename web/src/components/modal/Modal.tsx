// src/components/Modal.tsx

import { JSX } from 'react';
import { ModalProps } from '@/components/modal/Modal.types';

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children
}: ModalProps): JSX.Element | null => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg rounded-lg border border-white/10 bg-gray-900 shadow-xl">
        {children}
      </div>
    </div>
  );
};
