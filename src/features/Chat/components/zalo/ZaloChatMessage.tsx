import React from 'react';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';
import ZaloUnsupportedMessage from '@features/Chat/components/zalo/ZaloUnsupportedMessage';
import ZaloTextMessage from '@features/Chat/components/zalo/ZaloTextMessage';
import ZaloAudioMessage from '@features/Chat/components/zalo/ZaloAudioMessage';
import ZaloImageMessage from '@features/Chat/components/zalo/ZaloImageMessage';
import ZaloLocationMessage from '@features/Chat/components/zalo/ZaloLocationMessage';

export default function ZaloChatMessage(props: ZaloMessageProps) {
  const { messageData } = props;
  if (messageData.type === 'text') {
    return <ZaloTextMessage {...props} />;
  }
  if (messageData.type === 'voice') {
    return <ZaloAudioMessage {...props} />;
  }
  if (messageData.type === 'photo' || messageData.type === 'gif' || messageData.type === 'sticker') {
    return <ZaloImageMessage {...props} />;
  }
  if (messageData.type === 'location') {
    return <ZaloLocationMessage {...props} />;
  }
  return <ZaloUnsupportedMessage {...props} />;
}
