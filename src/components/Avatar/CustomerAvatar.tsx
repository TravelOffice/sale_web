import { chatPresenter } from '@adapter/presenters';
import Avatar from '@components/Avatar/Avatar';
import { Conversation } from '@domain/entities/chat/Conversation';
import { usePage } from '@hooks/chat';
import Images from '@themes/Images';
import { getAvatarUrlByPlatform } from '@utils/ChatUtils';
import React, { useEffect, useState } from 'react';

export interface CustomerAvatarProps {
  conversation?: Conversation,
  className?: string,
  onClick?: React.MouseEventHandler<any>,
  height?: number,
  width?: number,
}

export const useCustomerAvatar = (conversation?: Conversation) => {
  if (!conversation) return undefined;
  const platform = conversation.chatPlatform;
  const defaultAvatar = conversation.contact.avatar;
  const [avatar, setAvatar] = useState(defaultAvatar);
  const pageId = usePage(platform)?.id;
  useEffect(() => {
    if (pageId) {
      chatPresenter.getUserProfile(
        platform,
        pageId,
        conversation.contact.id,
        conversation.id,
      ).then((profile) => {
        const path = getAvatarUrlByPlatform(platform, profile) || defaultAvatar;
        setAvatar(path);
      });
    }
  }, [conversation, pageId]);
  return avatar;
};

export default function CustomerAvatar(props: CustomerAvatarProps) {
  const {
    conversation,
    className,
    height,
    width,
    onClick,
  } = props;
  const avatar = useCustomerAvatar(conversation);
  return (
    <Avatar
      img={avatar || Images.defaultAvatar}
      imgHeight={height || 42}
      imgWidth={width || 42}
      className={className}
      onClick={onClick}
    />
  );
}
