import React from 'react';
import { FacebookAttachmentMessageProps } from '@features/Chat/components/facebookZalo/FacebookAttachmentMessageProps';
import FacebookImageMessage from '@features/Chat/components/facebookZalo/FacebookImageMessage';
import FacebookFileMessage from '@features/Chat/components/facebookZalo/FacebookFileMessage';
import FacebookAudioMessage from '@features/Chat/components/facebookZalo/FacebookAudioMessage';
import FacebookVideoMessage from '@features/Chat/components/facebookZalo/FacebookVideoMessage';
import { isDocumentFile } from '@utils/ChatUtils';
import FacebookDocumentMessage from '@features/Chat/components/facebookZalo/FacebookDocumentMessage';

export default function FacebookAttachmentMessage(props: FacebookAttachmentMessageProps) {
  const { attachment } = props;
  if (attachment.mimeType.startsWith('image/')) {
    return <FacebookImageMessage {...props} />;
  }
  if (attachment.mimeType.startsWith('audio/')) {
    return <FacebookAudioMessage {...props} />;
  }
  if (attachment.mimeType.startsWith('video/')) {
    return <FacebookVideoMessage {...props} />;
  }
  if (isDocumentFile(attachment.mimeType, attachment.name)) {
    return <FacebookDocumentMessage {...props} />;
  }
  return <FacebookFileMessage {...props} />;
}
