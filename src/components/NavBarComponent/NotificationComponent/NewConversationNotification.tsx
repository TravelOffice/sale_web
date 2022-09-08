import { NotificationProps } from '@components/NavBarComponent/NotificationProps';
import { ChatPlatform } from '@domain/entities/ChatPlatform';
import { NewConversationNotificationData } from '@domain/entities/notification/Notification';
import { New20Regular } from '@fluentui/react-icons';
import Images from '@themes/Images';
import React, { useCallback } from 'react';
import { SocialIcon } from 'react-social-icons';

export default function NewConversationNotification(props: NotificationProps) {
  const { notification, onClickHandled } = props;
  const {
    title,
    subtitle,
    unread,
    data: conversationInformation,
  } = notification as NewConversationNotificationData;
  const { chatPlatform } = conversationInformation;

  const onNotificationClicked = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClickHandled();
  }, []);

  const getPlatformConversationIcon = (platform: ChatPlatform) => {
    const style = { height: 32, width: 32 };
    if (platform === 'facebook') {
      return <SocialIcon network="facebook" style={style} />;
    }
    if (platform === 'telegram') {
      return <SocialIcon network="telegram" style={style} />;
    }
    return (
      <img
        className="me-1"
        src={Images.icons.socials.zaloLogo}
        alt=""
        style={style}
      />
    );
  };

  return (
    <div className="d-flex" onClick={onNotificationClicked}>
      <div className="list-item d-flex align-items-start">
        <div className="me-1">
          {getPlatformConversationIcon(chatPlatform)}
        </div>
        <div className="list-item-body d-flex flex-column flex-grow-1">
          <span className={unread ? 'text-primary' : ''}>
            {title}
            {
              unread ? <New20Regular /> : <></>
            }
          </span>
          <small className="notification-text">{subtitle}</small>
        </div>
      </div>
    </div>
  );
}
