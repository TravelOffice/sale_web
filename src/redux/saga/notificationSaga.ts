import {
  all, call, put, select, takeEvery, takeLatest,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '@domain/entities/Conversation';
import { chatActions } from '@redux/slices/chatSlice';
import { Notification, NotificationData } from '@domain/entities/Notification';
import Images from '@themes/Images';
import { notificationActions } from '@redux/slices/notificationSlice';
import { truncateStringWithEllipsis } from '@utils/CommonUtils';
import i18n from '@config/i18n';
import toasty from '@components/Toasty/Toasty';
import { isMyMessage } from '@utils/ChatUtils';
import { notificationPresenter } from '@adapter/presenters';
import { authActions } from '@redux/slices/authSlice';
import { history, RootState } from '@redux/store';
import { addElementToFirst, removeElementAt } from '@utils/ArrayUtils';

const notificationsSelector = (state: RootState) => state.notification.notifications;
const notificationsUnreadCountSelector = (state: RootState) => state.notification.unreadCount;

function* onNewConversation(action: PayloadAction<Conversation>) {
  try {
    const conversation = action.payload;
    const { lastMessage } = conversation;
    if (!lastMessage) {
      return;
    }
    if (isMyMessage(lastMessage)) {
      // Don't push notification if the message is sent by the user
      return;
    }
    // Check whether the user is being in Chat page
    const pathName: string = yield select((state: RootState) => state.router.location.pathname);
    if (pathName === '/apps/chat') {
      // Don't push any notification whenever the user is being in Chat page
      return;
    }
    const messageText = conversation.lastMessage?.messageData.text;
    const customerName = conversation.contact.fullName;
    const notificationTitle = i18n.t('NOTIFICATION.NOTIFICATION_NEW_CONVERSATION_TITLE', { customerName });
    const notificationMessage = messageText ? truncateStringWithEllipsis(messageText, 50) : i18n.t('NOTIFICATION.NOTIFICATION_NEW_CONVERSATION_MESSAGE', { customerName });
    const newNotification: Notification = {
      channelId: conversation.id,
      avatar: Images.defaultAvatar,
      data: conversation,
      title: notificationTitle,
      subtitle: notificationMessage,
      type: 'newConversation',
      createdAt: Date.now(),
    };
    toasty.show({
      type: 'success',
      title: notificationTitle,
      message: notificationMessage,
      onClick: () => {
        // TODO: Add query params to open chat of given customerId
        history.push('/apps/chat');
      },
    });
    const notifications: Notification[] = yield select(notificationsSelector);
    let unreadCount: number = yield select(notificationsUnreadCountSelector);
    const notificationIndex = notifications
      .findIndex((notification) => notification.channelId === newNotification.channelId);
    let newNotifications: Notification[];
    if (notificationIndex >= 0 && notificationIndex < unreadCount) {
      // Notification channel already exists, remove the old first
      newNotifications = removeElementAt(notifications, notificationIndex);
      newNotifications = addElementToFirst(newNotifications, newNotification);
    } else {
      // Push new notification and increase count
      newNotifications = addElementToFirst(notifications, newNotification);
      unreadCount += 1;
    }
    yield put(notificationActions.onNotificationsUpdated({
      notifications: newNotifications,
      unreadCount,
    }));
  } catch {
    // Do nothing
  }
}

function* cacheNotification(action: PayloadAction<NotificationData>) {
  const { notifications, unreadCount } = action.payload;
  yield call(notificationPresenter.saveNotification, notifications, unreadCount);
}

function* fetchNotifications() {
  const notificationData: NotificationData = yield call(
    notificationPresenter.getNotifications,
  );
  yield put(notificationActions.onNotificationsRetrieved(notificationData));
}

function* markAllRead() {
  const notifications: Notification[] = yield select(notificationsSelector);
  yield call(notificationPresenter.saveNotification, notifications, 0);
}

export default function* notificationSaga() {
  yield all([
    takeLatest(authActions.onInitialCompleted, fetchNotifications),
    takeEvery(chatActions.onNewConversation, onNewConversation),
    takeEvery(notificationActions.onNotificationsUpdated, cacheNotification),
    takeEvery(notificationActions.markAllRead, markAllRead),
  ]);
}
