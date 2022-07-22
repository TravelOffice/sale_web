import React from 'react';
import TextMessage from '@features/Chat/components/common/TextMessage';
import { FacebookMessageProps } from '@features/Chat/components/facebookZalo/FacebookMessageProps';

export default function FacebookTextMessage(props: FacebookMessageProps) {
  const { messageData } = props;
  const textData = messageData.text || '';
  return <TextMessage text={textData} />;
}
