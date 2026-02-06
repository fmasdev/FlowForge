// src/components/notification/NotificationStack.tsx

import { Notification } from "@/components/notification/Notification";
import { NotificationPosition, NotificationStackProps } from "@/components/notification/Notification.type";

const positionStyles: Record<NotificationPosition, string> = {
  'bottom-right': 'fixed bottom-4 right-4',
  'bottom-left': 'fixed bottom-4 left-4',
  'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2',
};

export const NotificationStack: React.FC<NotificationStackProps> = ({
  notifications,
  position = 'bottom-right',
  onClose,
}) => {
  return (
    <div className={`${positionStyles[position]} flex flex-col-reverse gap-2 z-50`}>
      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          type={notif.type}
          message={notif.message}
          onClose={() => onClose(notif.id)}
        />
      ))}
    </div>
  );
};
