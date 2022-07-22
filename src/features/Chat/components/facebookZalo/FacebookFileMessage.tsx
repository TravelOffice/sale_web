import React from 'react';
import { FacebookAttachmentMessageProps } from '@features/Chat/components/facebookZalo/FacebookAttachmentMessageProps';
import FileMessage from '@features/Chat/components/common/FileMessage';

export default function FacebookFileMessage(props: FacebookAttachmentMessageProps) {
  const { attachment } = props;
  return (
    <FileMessage url={attachment.url} fileName={attachment.name} />
  );
}
