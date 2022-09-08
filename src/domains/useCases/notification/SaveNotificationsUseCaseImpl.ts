import { notificationRepository } from '@adapter/repositories';
import { NotificationData } from '@domain/entities/notification/Notification';
import { SaveNotificationsUseCase } from '@domain/useCases/interfaces/notification/SaveNotificationsUseCase';

export default class SaveNotificationsUseCaseImpl implements SaveNotificationsUseCase {
  invoke = async (
    notifications: NotificationData[],
  ) => notificationRepository.cacheNotifications(notifications);
}
