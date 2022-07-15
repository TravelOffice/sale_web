import { Notification } from '@domain/entities/Notification';

export interface NotificationProps {
  notification: Notification,
  unread: boolean,
}
