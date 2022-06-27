import React from 'react';
import { MessageProps } from '@features/Chat/components/MessageProps';
import AttachmentMessage from '@features/Chat/components/AttachmentMessage';

export default function AttachmentsMessage(props: MessageProps) {
  const { message, onClick } = props;
  const attachments = message.messageData.attachments!;
  if (attachments.length === 1) {
    return <AttachmentMessage attachment={attachments[0]} message={message} onClick={onClick} />;
  }
  // TODO: Show multiple attachments message
  return <></>;
}
