import React from 'react';
import { AttachmentMessageProps } from '@features/Chat/components/AttachmentMessageProps';
import { FileText } from 'react-feather';

export default function FileMessage(props: AttachmentMessageProps) {
  const { attachment, message } = props;
  return (
    <div key={message.id} className="chat-content">
      <p>
        <FileText size={17} />
        {' '}
        <a href={attachment.url} target="_blank" rel="noreferrer">{attachment.name}</a>
      </p>
    </div>
  );
}
