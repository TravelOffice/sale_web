import React from 'react';
import { FacebookAttachmentMessageProps } from '@features/Chat/components/facebookZalo/FacebookAttachmentMessageProps';
import DocumentMessage from '@features/Chat/components/common/DocumentMessage';

export default function FacebookDocumentMessage(props: FacebookAttachmentMessageProps) {
  const { attachment } = props;
  return <DocumentMessage url={attachment.url!} fileName={attachment.name} />;
}
