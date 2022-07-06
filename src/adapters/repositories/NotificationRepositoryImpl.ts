import { NotificationRepository } from '@adapter/repositories/interfaces/NotificationRepository';
import { NotificationData, Notification } from '@domain/entities/Notification';
import { storageProvider } from '@adapter/infrastructures';
import { NOTIFICATION_KEY_IN_LOCAL_STORAGE, NOTIFICATION_UNREAD_KEY_IN_LOCAL_STORAGE } from '@utils/Constants';

export default class NotificationRepositoryImpl implements NotificationRepository {
  /**
   * Method to get all notifications. Temporary, all notifications are saved in localStorage.
   * @returns NotificationData which contains all notifications and number of unread notifications
   */
  getNotifications = async (): Promise<NotificationData> => {
    // Get cached data from local storage
    const unreadNotificationsCount = await storageProvider.getItem(
      NOTIFICATION_UNREAD_KEY_IN_LOCAL_STORAGE,
    );
    const notificationsInJSON = await storageProvider.getItem(NOTIFICATION_KEY_IN_LOCAL_STORAGE);
    let notifications : Notification[] = [];
    if (notificationsInJSON) {
      notifications = JSON.parse(notificationsInJSON);
    }
    return { notifications, unreadCount: unreadNotificationsCount };
  }

  /**
   * Save all notifications and number of unread ones to localStorage. Due to limitation of
   * storage's capacity, only 20 latest items are saved.
   * @param notifications all items should be saved
   * @param unreadCount number of unread notifications
   */
  cacheNotification = async (notifications: Notification[], unreadCount: number) => {
    let newNotifications: Notification[] = [...notifications];
    if (notifications.length > 20) {
      // Ensure cache 20 items only
      newNotifications = newNotifications.slice(0, 20);
    }
    await storageProvider.setItem(
      NOTIFICATION_KEY_IN_LOCAL_STORAGE,
      JSON.stringify(newNotifications),
    );
    await storageProvider.setItem(NOTIFICATION_UNREAD_KEY_IN_LOCAL_STORAGE, unreadCount);
  }
}
