import { FetchResult, Observable } from '@apollo/client';
import { NotificationData, Notifications } from '@domain/entities/notification/Notification';

export interface NotificationPresenter {
  getNotifications: () => Promise<Notifications>
  saveNotifications: (notifications: NotificationData[]) => Promise<void>
  clearNotifications: () => Promise<void>
  subscribeNewNotification: () => Observable<FetchResult>
}
