import { NotificationData } from '@domain/entities/notification/Notification';

export interface NotificationProps {
  notification: NotificationData,
  onClickHandled: () => void,
}
