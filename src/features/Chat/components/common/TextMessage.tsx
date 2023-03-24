import classNames from 'classnames';
import DOMPurify from 'dompurify';
import React from 'react';

export interface TextMessageProps {
  text: string,
  seen?: boolean,
}

/**
 * Component to display text message
 * @param props
 * @constructor
 */
export default function TextMessage(props: TextMessageProps) {
  const { text, seen } = props;
  const replacedText = text.replace(
    /((http|https|ftp|ftps):\/\/[a-zA-Z\d\-.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g,
    '<a href="$1" target="_blank">$1</a>',
  );
  return (
    <div className={classNames('chat-content', { preview: seen })}>
      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replacedText, { ADD_ATTR: ['target'] }) }} />
    </div>
  );
}
