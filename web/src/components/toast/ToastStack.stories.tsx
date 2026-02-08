// src/components/Toast/ToastStack.stories.tsx

'use client';

import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ToastStack } from './ToastStack';
import { ToastItem, ToastType } from '@/components/toast/Toast.type';

const meta: Meta<typeof ToastStack> = {
  title: 'Components/ToastStack',
  component: ToastStack,
};
export default meta;

type Story = StoryObj<typeof ToastStack>;

let nextId = 1;

export const InteractiveStack: Story = {
  render: () => {
    const [Toasts, setToasts] = useState<ToastItem[]>([
      { id: 1, type: 'info', message: 'Toast info' },
      { id: 2, type: 'success', message: 'Toast succès' },
      { id: 3, type: 'error', message: 'Toast erreur' },
    ]);

    const handleClose = (id: number) => {
      setToasts((prev) => prev.filter((n) => n.id !== id));
    };

    const addToast = (type: ToastType) => {
      const id = nextId++;
      const messages: Record<ToastType, string> = {
        info: 'Nouvelle info !',
        success: 'Opération réussie !',
        error: 'Une erreur est survenue !',
      };

      setToasts((prev) => [
        ...prev,
        { id, type, message: messages[type] },
      ]);
    };

    return (
      <div className="p-8 space-y-4">
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => addToast('info')}
          >
            Ajouter Info
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => addToast('success')}
          >
            Ajouter Succès
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => addToast('error')}
          >
            Ajouter Erreur
          </button>
        </div>

        <ToastStack
          Toasts={Toasts}
          position="bottom-right"
          onClose={handleClose}
        />
      </div>
    );
  },
};
