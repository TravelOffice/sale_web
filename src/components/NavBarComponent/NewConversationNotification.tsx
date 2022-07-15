import { NotificationProps } from '@components/NavBarComponent/NotificationProps';
import React, { useCallback } from 'react';
import { Conversation } from '@domain/entities/Conversation';
import { useHistory } from 'react-router-dom';
import ConversationAvatar from '@components/Avatar/CustomerAvatar';

export default function NewConversationNotification(props: NotificationProps) {
  const { notification } = props;
  const conversation = notification.data as Conversation;
  const history = useHistory();
  const onNotificationClicked = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // TODO: Add query params to open chat of the customer who has sent this message
    history.push('/apps/chat');
  }, []);
  return (
    <a className="d-flex" href="/" onClick={onNotificationClicked}>
      <div className="list-item d-flex align-items-start">
        <div className="me-1">
          <ConversationAvatar conversation={conversation} />
        </div>
        <div className="list-item-body d-flex flex-column flex-grow-1">
          <span>
            {notification.title}
          </span>
          <small className="notification-text">{notification.subtitle}</small>
        </div>
      </div>
    </a>
  );
}
