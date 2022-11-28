import React from 'react';
import { MessageProps } from '@features/Chat/components/MessageProps';
import FacebookChatMessage from '@features/Chat/components/facebookZalo/FacebookChatMessage';
import TelegramChatMessage from '@features/Chat/components/telegram/TelegramChatMessage';
import ZaloChatMessage from '@features/Chat/components/zalo/ZaloChatMessage';

export default function ChatMessage(props: MessageProps<any>) {
  const { message } = props;
  if (message.chatPlatform === 'facebook') {
    return <FacebookChatMessage {...props} />;
  }
  if (message.chatPlatform === 'zalo') {
    return <ZaloChatMessage {...props} />;
  }
  if (message.chatPlatform === 'telegram') {
    return <TelegramChatMessage {...props} />;
  }
  return <></>;
}
