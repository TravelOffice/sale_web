import { Conversation } from '@domain/entities/chat/Conversation';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import { ChatPlatform } from '../ChatPlatform';

export const notificationTypes = ['newChatMessage', 'newConversation', 'syncEmailSucceed', 'newEmailReceived'] as const;

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
  onClick?: () => void,
}

export type NewMessageNotificationData = Notification<'newChatMessage', Conversation>;
export type NewConversationNotificationData = Notification<'newConversation', { chatPlatform: ChatPlatform, conversationId: string }>;
export type SyncEmailNotificationData = Notification<'syncEmailSucceed', { messageCount: number }>;
export type NewEmailReceivedNotificationData = Notification<'syncEmailSucceed', MailMessage[]>;

export type NotificationData =
  NewMessageNotificationData
  | NewConversationNotificationData
  | SyncEmailNotificationData
  | NewEmailReceivedNotificationData;

export interface Notifications {
  notifications: NotificationData[]
}
