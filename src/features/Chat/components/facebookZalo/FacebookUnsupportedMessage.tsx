import React from 'react';
import { FacebookMessageProps } from '@features/Chat/components/facebookZalo/FacebookMessageProps';
import UnsupportedMessage from '@features/Chat/components/common/UnsupportedMessage';

const PLATFORM_URL = 'https://messenger.com/';

export default function FacebookUnsupportedMessage(props: FacebookMessageProps) {
  const { message } = props;

  return <UnsupportedMessage key={message.id} platformUrl={PLATFORM_URL} />;
}
