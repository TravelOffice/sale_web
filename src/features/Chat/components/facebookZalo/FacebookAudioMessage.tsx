import React from 'react';
import { FacebookAttachmentMessageProps } from '@features/Chat/components/facebookZalo/FacebookAttachmentMessageProps';
import AudioMessage from '@features/Chat/components/common/AudioMessage';

export default function FacebookAudioMessage(props: FacebookAttachmentMessageProps) {
  const { attachment } = props;
  return (
    <AudioMessage url={attachment.url} />
  );
}
