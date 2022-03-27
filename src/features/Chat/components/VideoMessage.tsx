import React, { CSSProperties } from 'react';
import { AttachmentMessageProps } from '@features/Chat/components/AttachmentMessageProps';

export default function VideoMessage(props: AttachmentMessageProps) {
  const { message, attachment } = props;
  const styles : CSSProperties = {};
  const { width, height } = attachment;
  if (width && height && width < height) {
    styles.maxWidth = '20%';
  }
  return (
    <div style={styles} key={message.id} className="video chat-content">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video controls>
        <source src={attachment.url} />
      </video>
    </div>
  );
}
