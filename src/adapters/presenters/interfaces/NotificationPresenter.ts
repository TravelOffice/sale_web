import { Notification, NotificationData } from '@domain/entities/Notification';

export interface NotificationPresenter {
  getNotifications: () => Promise<NotificationData>
  saveNotification: (notifications: Notification[], unreadCount: number) => Promise<void>,
}
