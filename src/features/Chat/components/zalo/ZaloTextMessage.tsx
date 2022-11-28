import React from 'react';
import TextMessage from '@features/Chat/components/common/TextMessage';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';

export default function ZaloTextMessage(props: ZaloMessageProps) {
  const { messageData } = props;
  const textData = messageData.message;
  return <TextMessage text={textData} />;
}
