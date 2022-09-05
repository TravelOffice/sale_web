import { notificationRepository } from '@adapter/repositories';
import { ClearNotificationsUseCase } from '../interfaces/notification/ClearNotificationsUseCase';

export default class ClearNotificationsUseCaseImpl implements ClearNotificationsUseCase {
  invoke = async () => notificationRepository.clearNotifications();
}
