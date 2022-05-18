import React from 'react';
import { AttachmentMessageProps } from '@features/Chat/components/AttachmentMessageProps';
import { FileText } from 'react-feather';

export default function DocumentMessage(props: AttachmentMessageProps) {
  const { message, attachment } = props;
  const url = `https://docs.google.com/viewer?url=${encodeURIComponent(attachment.url!)}`;
  return (
    <div key={message.id} className="chat-content">
      <p>
        <FileText size={17} />
        {' '}
        <a href={url} target="_blank" rel="noreferrer">{attachment.name}</a>
      </p>
    </div>
  );
}
