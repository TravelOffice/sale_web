import React, { useCallback } from 'react';
import { FacebookAttachmentMessageProps } from '@features/Chat/components/facebookZalo/FacebookAttachmentMessageProps';
import ImageMessage from '@features/Chat/components/common/ImageMessage';

export default function FacebookImageMessage(props: FacebookAttachmentMessageProps) {
  const { message, attachment, onClick } = props;
  const { width, height } = attachment;
  const onClickImageMessage = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClick?.(message);
  }, []);
  return (
    <ImageMessage
      alt={attachment.name}
      url={attachment.url}
      width={width}
      height={height}
      onClick={onClickImageMessage}
    />
  );
}
