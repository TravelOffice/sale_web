import { NotificationPresenter } from '@adapter/presenters/interfaces/NotificationPresenter';
import { NotificationData } from '@domain/entities/notification/Notification';
import {
  getNotificationsUseCase,
  saveNotificationsUseCase,
  subscribeNewNotificationUseCase,
  clearNotificationsUseCase,
} from '@domain/useCases';

export default class NotificationPresenterImpl implements NotificationPresenter {
  getNotifications = async () => getNotificationsUseCase.invoke();

  saveNotifications = async (
    notifications: NotificationData[],
  ) => saveNotificationsUseCase.invoke(notifications);

  clearNotifications = async () => clearNotificationsUseCase.invoke();

  subscribeNewNotification = () => subscribeNewNotificationUseCase.invoke();
}
