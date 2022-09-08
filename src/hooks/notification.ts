import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

export const useNotifications = () => useSelector((
  state: RootState,
) => state.notification.notifications);

export const useUnreadNotificationCount = () => useSelector((
  state: RootState,
) => state.notification.notifications.filter((notification) => notification.unread).length);
