import { SaveNotificationUseCase } from '@domain/useCases/interfaces/notification/SaveNotificationUseCase';
import { Notification } from '@domain/entities/Notification';
import { notificationRepository } from '@adapter/repositories';

export default class SaveNotificationUseCaseImpl implements SaveNotificationUseCase {
  invoke = async (
    notifications: Notification[], unreadCount: number,
  ) => notificationRepository.cacheNotification(notifications, unreadCount);
}
