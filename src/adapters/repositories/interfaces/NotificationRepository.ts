import { NotificationData, Notification } from '@domain/entities/Notification';

export interface NotificationRepository {
  cacheNotification: (notifications: Notification[], unreadCount: number) => Promise<void>,
  getNotifications: () => Promise<NotificationData>
}
