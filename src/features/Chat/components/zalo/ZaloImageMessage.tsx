import React from 'react';
import ImageMessage from '@features/Chat/components/common/ImageMessage';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';

export default function ZaloImageMessage(props: ZaloMessageProps) {
  const { messageData } = props;
  const { url } = messageData;
  return (
    <ImageMessage
      alt=""
      url={url}
    />
  );
}
