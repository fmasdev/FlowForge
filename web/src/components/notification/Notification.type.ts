// src/components/notification/Notification.type.ts

import { IconName } from "@/assets/svg";

export type NotificationType = 'info' | 'success' | 'danger';
export type NotificationPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface NotificationStyle {
  bg: string;
  icon: IconName;
  iconColor: string;
}

export type NotificationProps = {
  type: NotificationType;
  message: string;
  position?: NotificationPosition;
};
