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
    let subtitle: string;
    if (isAdmin) {
      // Support showing title / subtitle for admin
      subtitle = i18n.t(
        'ADMIN_NOTIFICATION.NEW_ASSIGNED_CONVERSATION_SUBTITLE',
        {
          chatPlatform,
          username,
        },
      );
    } else {
      // Normal user
      subtitle = i18n.t('NOTIFICATION.NEW_ASSIGNED_CONVERSATION_SUBTITLE', { chatPlatform });
    }

    return {
      channelId: conversationId,
      title,
      subtitle,
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
