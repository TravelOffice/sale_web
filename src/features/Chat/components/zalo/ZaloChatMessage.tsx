import React from 'react';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';
import ZaloUnsupportedMessage from '@features/Chat/components/zalo/ZaloUnsupportedMessage';
import ZaloTextMessage from '@features/Chat/components/zalo/ZaloTextMessage';
import ZaloAudioMessage from '@features/Chat/components/zalo/ZaloAudioMessage';
import ZaloImageMessage from '@features/Chat/components/zalo/ZaloImageMessage';
import ZaloLocationMessage from '@features/Chat/components/zalo/ZaloLocationMessage';
import ZaloFileMessage from './ZaloFileMessage';

export default function ZaloChatMessage(props: ZaloMessageProps) {
  const { messageData } = props;
  if (messageData.text) {
    return <ZaloTextMessage {...props} />;
  }

  if (messageData.attachments?.length === 0) {
    return <ZaloUnsupportedMessage {...props} />;
  }

  const messageType = messageData.attachments?.[0].type;
  if (messageType === 'audio') {
    return <ZaloAudioMessage {...props} />;
  }

  if (messageType === 'image' || messageType === 'gif' || messageType === 'sticker') {
    return <ZaloImageMessage {...props} />;
  }

  if (messageType === 'location') {
    return <ZaloLocationMessage {...props} />;
  }

  if (messageType === 'file') {
    return <ZaloFileMessage {...props} />;
  }

  return <ZaloUnsupportedMessage {...props} />;
}
