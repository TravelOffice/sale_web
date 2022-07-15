import { Notification } from '@domain/entities/Notification';

export interface SaveNotificationUseCase {
  invoke: (notifications: Notification[], unreadCount: number) => Promise<void>,
}
