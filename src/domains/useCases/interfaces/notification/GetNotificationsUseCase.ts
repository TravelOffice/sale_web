import { Notifications } from '@domain/entities/notification/Notification';

export interface GetNotificationsUseCase {
  invoke: () => Promise<Notifications>
}
