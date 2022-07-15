import { GetNotificationsUseCase } from '@domain/useCases/interfaces/notification/GetNotificationsUseCase';
import { notificationRepository } from '@adapter/repositories';

export default class GetNotificationsUseCaseImpl implements GetNotificationsUseCase {
  invoke = async () => notificationRepository.getNotifications();
}
