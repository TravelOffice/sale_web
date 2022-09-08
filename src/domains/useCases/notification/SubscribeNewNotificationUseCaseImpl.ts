import { notificationRepository } from '@adapter/repositories';
import { SubscribeNewNotificationUseCase } from '../interfaces/notification/SubscribeNewNotificationUseCase';

export default class SubscribeNewNotificationUseCaseImpl
implements SubscribeNewNotificationUseCase {
  invoke = () => notificationRepository.subscribeToNewNotification();
}
