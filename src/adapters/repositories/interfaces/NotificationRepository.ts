import { FetchResult, Observable } from '@apollo/client';
import { NotificationData, Notifications } from '@domain/entities/notification/Notification';

export interface NotificationRepository {
  cacheNotifications: (notifications: NotificationData[]) => Promise<void>
  getNotifications: () => Promise<Notifications>
  clearNotifications: () => Promise<void>
  subscribeToNewNotification: () => Observable<FetchResult>
}
