import { Conversation } from '@domain/entities/chat/Conversation';
import { ChatPlatform } from '../ChatPlatform';

export const notificationTypes = ['newChatMessage', 'newConversation'] as const;

export type NotificationType = typeof notificationTypes[number];

export interface I18NNotificationData {
  key: string,
  params?: any,
}
export interface Notification<T extends NotificationType, D extends any> {
  channelId: string,
  title: string,
  titleI18n: I18NNotificationData,
  subtitle: string,
  subtitleI18n?: I18NNotificationData,
  avatar: string,
  type: T,
  data: D,
  createdAt: number,
  unread: boolean,
}

export type NewMessageNotificationData = Notification<'newChatMessage', Conversation>;
export type NewConversationNotificationData = Notification<'newConversation', { chatPlatform: ChatPlatform, conversationId: string }>;

export type NotificationData = NewMessageNotificationData | NewConversationNotificationData;

export interface Notifications {
  notifications: NotificationData[]
}
