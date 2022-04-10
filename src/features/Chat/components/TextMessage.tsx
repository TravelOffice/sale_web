import React from 'react';
import { MessageProps } from '@features/Chat/components/MessageProps';
import DOMPurify from 'dompurify';

export interface TextMessageProps extends MessageProps {
}

export default function TextMessage(props: TextMessageProps) {
  const { message } = props;
  const text = message.messageData.text.replace(
    /((http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g,
    '<a href="$1" target="_blank">$1</a>',
  );
  return (
    <div key={message.id} className="chat-content">
      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text, { ADD_ATTR: ['target'] }) }} />
    </div>
  );
}
