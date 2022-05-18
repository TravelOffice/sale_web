import React from 'react';
import { AttachmentMessageProps } from '@features/Chat/components/AttachmentMessageProps';

export default function AudioMessage(props: AttachmentMessageProps) {
  const { message, attachment } = props;
  return (
    <div key={message.id} className="audio chat-content">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio controls>
        <source src={attachment.url} />
      </audio>
    </div>
  );
}
