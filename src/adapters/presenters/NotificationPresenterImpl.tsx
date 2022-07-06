import { NotificationPresenter } from '@adapter/presenters/interfaces/NotificationPresenter';
import { getNotificationsUseCase, saveNotificationUseCase } from '@domain/useCases';
import { Notification } from '@domain/entities/Notification';

export default class NotificationPresenterImpl implements NotificationPresenter {
  getNotifications = async () => getNotificationsUseCase.invoke();

  saveNotification = async (
    notifications: Notification[], unreadCount: number,
  ) => saveNotificationUseCase.invoke(notifications, unreadCount);
}
