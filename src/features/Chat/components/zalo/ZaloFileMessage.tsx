import React from 'react';
import FileMessage from '@features/Chat/components/common/FileMessage';
import { ZaloReceivedFileMessage } from '@domain/entities/chat/Message';
import { ZaloMessageProps } from './ZaloMessageProps';

export default function ZaloFileMessage(props: ZaloMessageProps) {
  const { messageData } = props;
  const receivedMessage = messageData.attachments?.[0] as ZaloReceivedFileMessage;
  return (
    <FileMessage url={receivedMessage.payload.url} fileName={receivedMessage.payload.name} />
  );
}
