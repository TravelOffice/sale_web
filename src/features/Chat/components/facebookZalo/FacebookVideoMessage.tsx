import React from 'react';
import { FacebookAttachmentMessageProps } from '@features/Chat/components/facebookZalo/FacebookAttachmentMessageProps';
import VideoMessage from '@features/Chat/components/common/VideoMessage';

export default function FacebookVideoMessage(props: FacebookAttachmentMessageProps) {
  const { attachment } = props;
  const { width, height } = attachment;
  return (
    <VideoMessage width={width} height={height} url={attachment.url} />
  );
}
