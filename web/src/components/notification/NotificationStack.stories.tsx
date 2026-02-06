// src/components/notification/NotificationStack.stories.tsx

'use client';

import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { NotificationStack } from './NotificationStack';
import { NotificationItem, NotificationType } from '@/components/notification/Notification.type';

const meta: Meta<typeof NotificationStack> = {
  title: 'Components/NotificationStack',
  component: NotificationStack,
};
export default meta;

type Story = StoryObj<typeof NotificationStack>;

let nextId = 1;

export const InteractiveStack: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([
      { id: 1, type: 'info', message: 'Notification info' },
      { id: 2, type: 'success', message: 'Notification succès' },
      { id: 3, type: 'error', message: 'Notification erreur' },
    ]);

    const handleClose = (id: number) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const addNotification = (type: NotificationType) => {
      const id = nextId++;
      const messages: Record<NotificationType, string> = {
        info: 'Nouvelle info !',
        success: 'Opération réussie !',
        error: 'Une erreur est survenue !',
      };

      setNotifications((prev) => [
        ...prev,
        { id, type, message: messages[type] },
      ]);
    };

    return (
      <div className="p-8 space-y-4">
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => addNotification('info')}
          >
            Ajouter Info
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => addNotification('success')}
          >
            Ajouter Succès
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => addNotification('error')}
          >
            Ajouter Erreur
          </button>
        </div>

        <NotificationStack
          notifications={notifications}
          position="bottom-right"
          onClose={handleClose}
        />
      </div>
    );
  },
};
