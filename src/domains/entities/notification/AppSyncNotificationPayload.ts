import { ChatPlatform } from '../ChatPlatform';

export interface BasedAppSyncNotificationPayload
  <
  T extends AppSyncNotificationType = 'UNKNOWN',
  D extends any = any,
  > {
  tenant?: string,
  // Username identifier to filter subscription
  username?: string,
  // Notification type
  type: T,
  // Timestamp
  timestamp: number,
  // Notification data
  data: D,
}

export const appsyncNotificationTypes = ['UNKNOWN', 'CHAT_NEW_CONVERSATION_ASSIGNED'] as const;

export type AppSyncNotificationType = typeof appsyncNotificationTypes[number];

export interface ASNewConversationNotificationData {
  tenant: string,
  chatPlatform: ChatPlatform,
  pageId: string,
  conversationId: string,
}

export type ASNewConversationNotification = BasedAppSyncNotificationPayload<'CHAT_NEW_CONVERSATION_ASSIGNED', ASNewConversationNotificationData>;

export type AppSyncNotificationPayload =
  ASNewConversationNotification
  | BasedAppSyncNotificationPayload;
