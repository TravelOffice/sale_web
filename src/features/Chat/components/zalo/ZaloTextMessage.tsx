import React from 'react';
import TextMessage from '@features/Chat/components/common/TextMessage';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';

export default function ZaloTextMessage(props: ZaloMessageProps) {
  const { messageData, message } = props;
  const { seen } = message;
  const textData = String(messageData.text);
  return <TextMessage text={textData} seen={seen} />;
}
