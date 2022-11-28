import React from 'react';
import i18n from '@config/i18n';

export interface UnsupportedMessageProps {
  platformUrl: string,
}

export default function UnsupportedMessage(props: UnsupportedMessageProps) {
  const { platformUrl } = props;

  return (
    <>
      <div className="chat-content">
        {i18n.t('CHAT.UNSUPPORTED_MESSAGE')}
        {' '}
        <a href={platformUrl} target="_blank" rel="noreferrer">
          {platformUrl}
        </a>
      </div>
    </>
  );
}
