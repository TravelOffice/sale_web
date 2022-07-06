import { NotificationData } from '@domain/entities/Notification';

export interface GetNotificationsUseCase {
  invoke: () => Promise<NotificationData>
}
