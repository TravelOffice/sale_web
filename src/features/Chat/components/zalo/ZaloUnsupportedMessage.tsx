import React from 'react';
import UnsupportedMessage from '@features/Chat/components/common/UnsupportedMessage';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';

const PLATFORM_URL = 'https://oa.zalo.me/chatv2/';

export default function ZaloUnsupportedMessage(props: ZaloMessageProps) {
  const { message } = props;
  return <UnsupportedMessage key={message.id} platformUrl={PLATFORM_URL} />;
}
