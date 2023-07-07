import { notificationPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { Conversation } from '@domain/entities/chat/Conversation';
import { ChatPlatform } from '@domain/entities/ChatPlatform';
import {
  AppSyncNotificationPayload,
  ASNewConversationNotification, NewEmailReceivedNotification,
} from '@domain/entities/notification/AppSyncNotificationPayload';
import { NotificationData, Notifications } from '@domain/entities/notification/Notification';
import { User } from '@domain/entities/User';
import { authActions } from '@redux/slices/authSlice';
import { chatActions } from '@redux/slices/chatSlice';
import { notificationActions } from '@redux/slices/notificationSlice';
import { history, RootState } from '@redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import Images from '@themes/Images';
import { addElementToFirst, removeElementAt } from '@utils/ArrayUtils';
import { getConversationText } from '@utils/ChatUtils';
import { truncateStringWithEllipsis } from '@utils/CommonUtils';
import fromAppSyncToAppNotification from '@utils/notification/mapper';
import { END, EventChannel, eventChannel } from 'redux-saga';
import {
  all, call, cancelled, put, select, take, takeEvery, takeLatest,
} from 'redux-saga/effects';
import { mailActions } from '@redux/slices/mailSlice';

const notificationsSelector = (state: RootState) => state.notification.notifications;
const notificationsUnreadCountSelector = (state: RootState) => {
  const { notifications } = state.notification;
  return notifications.filter((notification) => notification.unread).length;
};

// UTILITY FUNCTIONS //

/**
 * Handle new notification event
 * Notifications list should be updated
 * @param newNotification New notification data
 */
function* onNewNotification(newNotification: NotificationData) {
  toasty.show({
    type: 'success',
    title: newNotification.title,
    message: newNotification.subtitle,
    onClick: newNotification.onClick,
  });
  const notifications: NotificationData[] = yield select(notificationsSelector);
  let unreadCount: number = yield select(notificationsUnreadCountSelector);
  const notificationIndex = notifications
    .findIndex((notification) => notification.channelId === newNotification.channelId);
  let newNotifications: NotificationData[];
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
  }));
}

function* fetchPlatformConversations(platform: ChatPlatform) {
  yield put(chatActions.getPlatformConversations(platform));
}

// UTILITY FUNCTIONS //

function* onNewConversation(action: PayloadAction<Conversation>) {
  try {
    const conversation = action.payload;
    const { lastMessage } = conversation;
    if (!lastMessage) {
      return;
    }
    // if (isMyMessage(lastMessage)) {
    //   // Don't push notification if the message is sent by the user
    //   return;
    // }
    // Check whether the user is being in Chat page
    const pathName: string = yield select((state: RootState) => state.router.location.pathname);
    if (pathName === '/apps/chat') {
      // Don't push any notification whenever the user is being in Chat page
      return;
    }
    const messageText = getConversationText(conversation);
    const customerName = conversation.contact.fullName;
    const notificationTitle = i18n.t('NOTIFICATION.NOTIFICATION_NEW_MESSAGE_TITLE', { customerName });
    const titleI18n = {
      key: 'NOTIFICATION.NOTIFICATION_NEW_MESSAGE_TITLE',
      params: { customerName },
    };
    const notificationMessage = messageText
      ? truncateStringWithEllipsis(messageText, 50)
      : i18n.t('NOTIFICATION.NOTIFICATION_NEW_MESSAGE_SUBTITLE', { customerName });

    let subtitleI18n;
    if (!messageText) {
      subtitleI18n = {
        key: 'NOTIFICATION.NOTIFICATION_NEW_MESSAGE_SUBTITLE',
        params: { customerName },
      };
    }
    const newNotification: NotificationData = {
      channelId: conversation.id,
      avatar: Images.defaultAvatar,
      data: conversation,
      title: notificationTitle,
      titleI18n,
      subtitle: notificationMessage,
      subtitleI18n,
      type: 'newChatMessage',
      createdAt: Date.now(),
      unread: true,
    };
    // TODO: Should also send notification to the user that was unassigned conversation
    // Because, the conversation is no longer assigned to old employee
    // Have to update marketing backend AppSync velocity template
    yield onNewNotification(newNotification);
  } catch {
    // Do nothing
  }
}

function* cacheNotifications(action: PayloadAction<Notifications>) {
  const { notifications } = action.payload;
  yield call(notificationPresenter.saveNotifications, notifications);
}

function* fetchNotifications() {
  const notificationData: Notifications = yield call(
    notificationPresenter.getNotifications,
  );
  yield put(notificationActions.onNotificationsRetrieved(notificationData));
}

function* clearNotifications() {
  yield call(notificationPresenter.clearNotifications);
}

function* syncNotificationsToStorage() {
  const notifications: NotificationData[] = yield select(notificationsSelector);
  yield call(notificationPresenter.saveNotifications, notifications);
}

/**
 * Create redux-saga event channel to listen to new message. Whenever receiving a message,
 * this channel should emit it. By using this event in infinite loop, the app
 */
function createSubscriptionChannel(): EventChannel<AppSyncNotificationPayload> {
  return eventChannel((emit) => {
    const obs = notificationPresenter.subscribeNewNotification().subscribe({
      next: (value) => {
        if (value.data) {
          if (!value.data) return;
          const receivedNotificationPayload = value.data.onNewNotificationReceived;
          if (!receivedNotificationPayload) return;
          emit({
            ...receivedNotificationPayload,
            data: JSON.parse(receivedNotificationPayload.data),
          });
        }
      },
      complete: () => {
        emit(END);
      },
    });

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    return () => {
      obs.unsubscribe();
    };
  });
}

function* handleNewChatConversation(notificationPayload: ASNewConversationNotification) {
  const currentUser: User | undefined = yield select((state: RootState) => state.auth.currentUser);

  // Ignore payload if notification is not same with current user
  // Admin user can read all notifications
  const isSendToUser = currentUser && currentUser.username !== notificationPayload.username;
  const roles: string[] = yield select(
    (state: RootState) => state.auth.currentUser?.roles || [],
  );
  // TODO: Check permissions instead of roles
  if (!isSendToUser && !roles.includes('ADMIN')) {
    return;
  }

  /**
   * Notify to update notifications list
   * Then, notifications are being shown at the top bar
   */
  // Re-fetch conversations list if chat page is opening
  const pathName: string = yield select((state: RootState) => state.router.location.pathname);
  if (pathName === '/apps/chat') {
    const { data } = notificationPayload;
    const { chatPlatform } = data;
    yield fetchPlatformConversations(chatPlatform);
  }

  // Notify new notification
  const isForAdmin = currentUser?.username !== notificationPayload.username;
  const newNotification = fromAppSyncToAppNotification(
    notificationPayload,
    isForAdmin,
  );
  yield onNewNotification(newNotification);
}

function* handleNewEmailReceived(payload: NewEmailReceivedNotification) {
  const { data, timestamp } = payload;
  if ('firstSync' in data) {
    const notificationData: NotificationData = {
      channelId: timestamp.toString(),
      title: i18n.t('COMMON.CONGRATULATIONS'),
      titleI18n: { key: 'COMMON.CONGRATULATIONS' },
      subtitle: i18n.t('MAIL.FIRST_SYNC_SUCCESSFULLY', { count: data.messageCount }),
      subtitleI18n: { key: 'MAIL.FIRST_SYNC_SUCCESSFULLY', params: { count: data.messageCount } },
      createdAt: timestamp,
      avatar: '',
      type: 'syncEmailSucceed',
      data: {
        messageCount: data.messageCount,
      },
      unread: true,
      onClick: () => {
        history.push({
          pathname: '/apps/email',
        });
      },
    };
    yield onNewNotification(notificationData);
  } else {
    const pathName: string = yield select((state: RootState) => state.router.location.pathname);
    // Do not push new notification in mail page
    if (pathName === '/app/mail') {
      yield put(mailActions.onNewMailMessages(data));
    } else {
      const notificationData: NotificationData = {
        channelId: timestamp.toString(),
        title: i18n.t('MAIL.NEW_EMAILS_RECEIVED'),
        titleI18n: { key: 'COMMON.NEW_EMAILS_RECEIVED' },
        subtitle: i18n.t('MAIL.NEW_EMAILS_RECEIVED_SUBTITLE', { count: data.length }),
        subtitleI18n: { key: 'MAIL.NEW_EMAILS_RECEIVED_SUBTITLE', params: { count: data.length } },
        createdAt: timestamp,
        avatar: '',
        type: 'syncEmailSucceed',
        data,
        unread: true,
        onClick: () => {
          history.push({
            pathname: '/apps/email',
          });
        },
      };
      yield onNewNotification(notificationData);
    }
  }
}

function* subscribeNewNotificationEvent() {
  const subscriptionChannel = createSubscriptionChannel();

  while (true) {
    try {
      // Get notification payload from channel
      const notificationPayload: AppSyncNotificationPayload = yield take(subscriptionChannel);

      const { type } = notificationPayload;
      switch (type) {
        case 'CHAT_NEW_CONVERSATION_ASSIGNED': yield handleNewChatConversation(notificationPayload);
          break;
        case 'MAIL_NEW_EMAIL_RECEIVED': yield handleNewEmailReceived(notificationPayload);
          break;
          // eslint-disable-next-line no-console
        default: console.error('Cannot resolve', type);
      }
    } catch (e) {
      // Do nothing
    } finally {
      const isCancelled: boolean = yield cancelled();
      if (isCancelled) {
        subscriptionChannel.close();
      }
    }
  }
}

export default function* notificationSaga() {
  yield all([
    takeLatest(authActions.onInitialCompleted, fetchNotifications),
    takeEvery(chatActions.onNewConversation, onNewConversation),
    takeEvery(notificationActions.onNotificationsUpdated, cacheNotifications),
    takeEvery(notificationActions.clearNotifications, clearNotifications),
    takeEvery(notificationActions.markAllRead, syncNotificationsToStorage),
    takeEvery(notificationActions.markRead, syncNotificationsToStorage),
    takeLatest(notificationActions.subscribeNewNotification, subscribeNewNotificationEvent),
  ]);
}
