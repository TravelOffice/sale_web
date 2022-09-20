import ConversationAvatar from '@components/Avatar/CustomerAvatar';
import { NotificationProps } from '@components/NavBarComponent/NotificationProps';
import { Conversation } from '@domain/entities/chat/Conversation';
import { New20Regular } from '@fluentui/react-icons';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function NewMessageNotification(props: NotificationProps) {
  const { t } = useTranslation();
  const { notification, onClickHandled } = props;
  const {
    data: conversation,
    unread,
    titleI18n,
    subtitle,
    subtitleI18n,
  } = notification;
  const onNotificationClicked = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClickHandled();
  }, []);
  return (
    <a className="d-flex" href="/" onClick={onNotificationClicked}>
      <div className="list-item d-flex align-items-start">
        <div className="me-1">
          <ConversationAvatar conversation={conversation as Conversation} />
        </div>
        <div className="list-item-body d-flex flex-column flex-grow-1">
          <span className={unread ? 'text-primary' : ''}>
            {t(titleI18n.key, titleI18n.params)}
            {
              unread ? <New20Regular /> : <></>
            }
          </span>
          {
            subtitleI18n
              ? <small className="notification-text">{t(subtitleI18n.key, subtitleI18n.params)}</small>
              : <small className="notification-text">{subtitle}</small>
          }
        </div>
      </div>
    </a>
  );
}
