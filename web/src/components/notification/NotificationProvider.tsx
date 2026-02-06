// src/components/notification/NotificationProvider.tsx

'use client';

import { useState, ReactNode, useContext, createContext } from 'react';
import { NotificationStack } from '@/components/notification/NotificationStack';
import type { NotificationContextValue, NotificationItem, NotificationPosition, NotificationType } from '@/components/notification/Notification.type';

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode; position?: NotificationPosition }> = ({
  children,
  position = 'bottom-right',
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // simple compteur pour id
  const [nextId, setNextId] = useState(1);

  const notify = (type: NotificationType, message: string) => {
    const id = nextId;
    setNextId((prev) => prev + 1);

    setNotifications((prev) => [...prev, { id, type, message }]);

    // Auto-dismiss after 5s
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationStack notifications={notifications} onClose={removeNotification} position={position} />
    </NotificationContext.Provider>
  );
};

// Hook easy for use
export const useNotification = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within a NotificationProvider');
  return context;
};