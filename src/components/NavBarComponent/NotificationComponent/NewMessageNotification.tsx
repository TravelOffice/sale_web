import ConversationAvatar from '@components/Avatar/CustomerAvatar';
import { NotificationProps } from '@components/NavBarComponent/NotificationProps';
import { Conversation } from '@domain/entities/chat/Conversation';
import { New20Regular } from '@fluentui/react-icons';
import React, { useCallback } from 'react';

export default function NewMessageNotification(props: NotificationProps) {
  const { notification, onClickHandled } = props;
  const { data: conversation, unread } = notification;
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
            {notification.title}
            {
              unread ? <New20Regular /> : <></>
            }
          </span>
          <small className="notification-text">{notification.subtitle}</small>
        </div>
      </div>
    </a>
  );
}
