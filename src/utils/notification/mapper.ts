import { AppSyncNotificationPayload } from '@domain/entities/notification/AppSyncNotificationPayload';
import i18n from '@config/i18n';
import { NotificationData } from '@domain/entities/notification/Notification';

const fromAppSyncToAppNotification = (
  appsyncNotification: AppSyncNotificationPayload,
  isAdmin: boolean = false,
): NotificationData => {
  const {
    type,
    data,
    username,
    timestamp,
  } = appsyncNotification;
  if (type === 'CHAT_NEW_CONVERSATION_ASSIGNED') {
    const { chatPlatform, conversationId } = data;
    const title = i18n.t('NOTIFICATION.NEW_ASSIGNED_CONVERSATION_TITLE');
    const titleI18n = {
      key: 'NOTIFICATION.NEW_ASSIGNED_CONVERSATION_TITLE',
    };
    let subtitleI18n;
    if (isAdmin) {
      // Support showing title / subtitle for admin
      subtitleI18n = {
        key: 'NOTIFICATION.ADMIN_NEW_ASSIGNED_CONVERSATION_SUBTITLE',
        params: {
          chatPlatform,
          username,
        },
      };
    } else {
      // Normal user
      subtitleI18n = {
        key: 'NOTIFICATION.NEW_ASSIGNED_CONVERSATION_SUBTITLE',
        params: { chatPlatform },
      };
    }

    const subtitle = i18n.t(subtitleI18n.key, subtitleI18n.params);

    return {
      channelId: conversationId,
      title,
      titleI18n,
      subtitle,
      subtitleI18n,
      createdAt: timestamp,
      avatar: '',
      type: 'newConversation',
      data: {
        chatPlatform,
        conversationId,
      },
      unread: true,
    };
  }

  throw new Error(`Notification ${type} type is not supported yet.`);
};

export default fromAppSyncToAppNotification;
