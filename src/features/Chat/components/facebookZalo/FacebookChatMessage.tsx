import React from 'react';
import UnsupportedMessage from '@features/Chat/components/facebookZalo/UnsupportedMessage';
import FacebookAttachmentsMessage from '@features/Chat/components/facebookZalo/FacebookAttachmentsMessage';
import FacebookStickerMessage from '@features/Chat/components/facebookZalo/FacebookStickerMessage';
import FacebookTextMessage from '@features/Chat/components/facebookZalo/FacebookTextMessage';
import { MessageData } from '@domain/entities/chat/Message';
import { FacebookMessageProps } from '@features/Chat/components/facebookZalo/FacebookMessageProps';

export default function FacebookChatMessage(props: FacebookMessageProps) {
  const { message } = props;
  if (message.isUnsupported) {
    return <UnsupportedMessage {...props} />;
  }
  const messageData = message.messageData as MessageData;
  if (messageData.attachments) {
    return <FacebookAttachmentsMessage {...props} />;
  }
  if (messageData.sticker) {
    return <FacebookStickerMessage {...props} />;
  }
  return <FacebookTextMessage {...props} />;
}
