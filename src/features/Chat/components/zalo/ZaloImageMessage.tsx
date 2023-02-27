import React from 'react';
import ImageMessage from '@features/Chat/components/common/ImageMessage';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';
import { ZaloReceivedImageMessage } from '@domain/entities/chat/Message';

export default function ZaloImageMessage(props: ZaloMessageProps) {
  const { messageData } = props;
  const receivedMessage = messageData.attachments?.[0] as ZaloReceivedImageMessage;
  const { url } = receivedMessage.payload;
  return (
    <ImageMessage
      alt=""
      url={url}
    />
  );
}
