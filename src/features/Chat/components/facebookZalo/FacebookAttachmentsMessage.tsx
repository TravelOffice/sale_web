import React from 'react';
import FacebookAttachmentMessage from '@features/Chat/components/facebookZalo/FacebookAttachmentMessage';
import { FacebookMessageProps } from '@features/Chat/components/facebookZalo/FacebookMessageProps';

export default function FacebookAttachmentsMessage(props: FacebookMessageProps) {
  const { messageData } = props;
  const attachments = messageData.attachments!;
  if (attachments.length === 1) {
    return (
      <FacebookAttachmentMessage attachment={attachments[0]} {...props} />
    );
  }
  // TODO: Show multiple attachments message
  return <></>;
}
