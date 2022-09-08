import { NotificationData } from '@domain/entities/notification/Notification';

export interface SaveNotificationsUseCase {
  invoke: (notifications: NotificationData[]) => Promise<void>,
}
