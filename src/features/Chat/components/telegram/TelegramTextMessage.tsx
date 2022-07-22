import React from 'react';
import TextMessage from '@features/Chat/components/common/TextMessage';
import { TelegramMessage } from '@domain/entities/chat/telegram';
import { TelegramMessageProps } from '@features/Chat/components/telegram/TelegramMessageProps';

export default function TelegramTextMessage(props: TelegramMessageProps) {
  const { message } = props;
  const messageData = message.messageData as TelegramMessage;
  return (
    <TextMessage text={messageData.text || ''} />
  );
}
