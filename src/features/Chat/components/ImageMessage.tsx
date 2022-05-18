import React, { CSSProperties } from 'react';
import { AttachmentMessageProps } from '@features/Chat/components/AttachmentMessageProps';

export default function ImageMessage(props: AttachmentMessageProps) {
  const { message, attachment } = props;
  const styles : CSSProperties = {};
  const { width, height } = attachment;
  if (width && height && width < height) {
    // For portrait image, it may display too large to view inside the chat window.
    // This leads the user have to scroll to view a part of image. It's inconvenience for
    // the user. Scale out it to solve this problem.
    styles.maxWidth = '20%';
  }
  return (
    <img style={styles} className="chat-content" key={message.id} src={attachment.url} alt={attachment.name} />
  );
}
