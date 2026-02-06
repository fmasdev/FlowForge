// src/components/notification/Notification.type.ts

import { IconName } from "@/assets/svg";

export type NotificationType = 'info' | 'success' | 'error';
export type NotificationPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface NotificationStyle {
  bg: string;
  icon: IconName;
  iconColor: string;
}

export interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
}

export interface NotificationContextValue {
  notify: (type: NotificationType, message: string) => void;
}

export interface NotificationStackProps {
  notifications: NotificationItem[];
  onClose: (id: number) => void;
  position?: NotificationPosition;
}

export type NotificationItem = {
  id: number;
  type: NotificationType;
  message: string;
};
