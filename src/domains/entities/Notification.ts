import { Conversation } from '@domain/entities/Conversation';

export const notificationTypes = ['newConversation'] as const;

export type NotificationType = typeof notificationTypes[number];

export interface Notification {
  channelId: string,
  title: string,
  subtitle: string,
  avatar: string,
  type: NotificationType,
  data: Conversation | any,
  createdAt: number,
}

export interface NotificationData {
  notifications: Notification[],
  unreadCount: number,
}
