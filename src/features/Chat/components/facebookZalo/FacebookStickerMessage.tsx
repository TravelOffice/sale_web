import React from 'react';
import { MessageData } from '@domain/entities/chat/Message';
import { FacebookMessageProps } from '@features/Chat/components/facebookZalo/FacebookMessageProps';
import StickerMessage from '@features/Chat/components/common/StickerMessage';

export default function FacebookStickerMessage(props: FacebookMessageProps) {
  const { message } = props;
  const messageData = message.messageData as MessageData;
  const url = messageData.sticker?.link!;
  return <StickerMessage url={url} />;
}
