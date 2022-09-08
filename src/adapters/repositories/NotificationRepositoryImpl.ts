import { sessionStorageProvider } from '@adapter/infrastructures';
import { NotificationRepository } from '@adapter/repositories/interfaces/NotificationRepository';
import { NotificationData, Notifications } from '@domain/entities/notification/Notification';
import gqlClient from '@graphql/client';
import { onNewNotification } from '@graphql/subscriptions';
import { NOTIFICATION_KEY_IN_LOCAL_STORAGE } from '@utils/Constants';

export default class NotificationRepositoryImpl implements NotificationRepository {
  /**
   * Method to get all notifications. Temporary, all notifications are saved in localStorage.
   * @returns NotificationData which contains all notifications and number of unread notifications
   */
  getNotifications = async (): Promise<Notifications> => {
    // Get cached data from session storage
    const notificationsInJSON = await sessionStorageProvider
      .getItem(
        NOTIFICATION_KEY_IN_LOCAL_STORAGE,
      );
    let notifications: NotificationData[] = [];
    if (notificationsInJSON) {
      notifications = JSON.parse(notificationsInJSON);
    }
    return { notifications };
  }

  /**
   * Save all notifications and number of unread ones to localStorage. Due to limitation of
   * storage's capacity, only 20 latest items are saved.
   * @param notifications all items should be saved
   * @param unreadCount number of unread notifications
   */
  cacheNotifications = async (notifications: NotificationData[]) => {
    let newNotifications: NotificationData[] = [...notifications];
    if (notifications.length > 20) {
      // Ensure cache 20 items only
      newNotifications = newNotifications.slice(0, 20);
    }
    await sessionStorageProvider.setItem(
      NOTIFICATION_KEY_IN_LOCAL_STORAGE,
      JSON.stringify(newNotifications),
    );
  }

  clearNotifications = async () => {
    await sessionStorageProvider.removeItem(NOTIFICATION_KEY_IN_LOCAL_STORAGE);
  }

  subscribeToNewNotification = () => gqlClient.subscribe({ query: onNewNotification });
}
