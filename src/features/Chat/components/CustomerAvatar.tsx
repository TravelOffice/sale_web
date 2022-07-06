import { chatPresenter } from '@adapter/presenters';
import Avatar from '@components/Avatar/Avatar';
import { Conversation } from '@domain/entities/Conversation';
import { usePage } from '@hooks/chat';
import Images from '@themes/Images';
import React, { useEffect, useState } from 'react';

export interface CustomerAvatarProps {
  conversation: Conversation,
}

const useCustomerAvatar = (conversation: Conversation) => {
  const [avatar, setAvatar] = useState(conversation.contact.avatar || Images.defaultAvatar);
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
  const { conversation } = props;
  const avatar = useCustomerAvatar(conversation);
  return (
    <Avatar img={avatar} imgHeight="42" imgWidth="42" />
  );
}
