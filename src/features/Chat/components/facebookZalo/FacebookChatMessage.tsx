import React from 'react';
import FacebookAttachmentsMessage from '@features/Chat/components/facebookZalo/FacebookAttachmentsMessage';
import FacebookStickerMessage from '@features/Chat/components/facebookZalo/FacebookStickerMessage';
import FacebookTextMessage from '@features/Chat/components/facebookZalo/FacebookTextMessage';
import { MessageData } from '@domain/entities/chat/Message';
import { FacebookMessageProps } from '@features/Chat/components/facebookZalo/FacebookMessageProps';

export default function FacebookChatMessage(props: FacebookMessageProps) {
  const { message } = props;
  const messageData = message.messageData as MessageData;
  if (messageData.attachments) {
    return <FacebookAttachmentsMessage {...props} />;
  }
  if (messageData.sticker) {
    return <FacebookStickerMessage {...props} />;
  }
  return <FacebookTextMessage {...props} />;
}
