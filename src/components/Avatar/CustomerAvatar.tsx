import { chatPresenter } from '@adapter/presenters';
import Avatar from '@components/Avatar/Avatar';
import { Conversation } from '@domain/entities/Conversation';
import { usePage } from '@hooks/chat';
import Images from '@themes/Images';
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
  const [avatar, setAvatar] = useState(conversation.contact.avatar);
  const fbPageId = usePage('facebook')?.id;
  useEffect(() => {
    if (conversation.chatPlatform === 'facebook' && fbPageId) {
      chatPresenter.getFbUserProfile(fbPageId, conversation.contact.id).then((profile) => {
        setAvatar(profile.profile_pic);
      });
    }
  }, [conversation, fbPageId]);
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
