import React from 'react';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import i18n from '@config/i18n';
import { FacebookMessageProps } from '@features/Chat/components/facebookZalo/FacebookMessageProps';

export default function UnsupportedMessage(props: FacebookMessageProps) {
  const { message } = props;

  const getChartPlatformUrl = (chatPlatform: ChatPlatform): string => {
    if (chatPlatform === 'facebook') {
      return 'https://messenger.com/';
    }
    return 'https://oa.zalo.me/chatv2/';
  };

  return (
    <>
      <div key={message.id} className="chat-content">
        {i18n.t('CHAT.UNSUPPORTED_MESSAGE')}
        {' '}
        <a href={getChartPlatformUrl(message.chatPlatform)} target="_blank" rel="noreferrer">
          {getChartPlatformUrl(message.chatPlatform)}
        </a>
      </div>
    </>
  );
}
