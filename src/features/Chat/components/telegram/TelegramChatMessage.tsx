import React from 'react';
import TelegramTextMessage from '@features/Chat/components/telegram/TelegramTextMessage';
import { TelegramMessageProps } from '@features/Chat/components/telegram/TelegramMessageProps';
import TelegramImageMessage from '@features/Chat/components/telegram/TelegramImageMessage';
import TelegramAudioMessage from '@features/Chat/components/telegram/TelegramAudioMessage';
import TelegramVideoMessage from '@features/Chat/components/telegram/TelegramVideoMessage';
import TelegramDocumentMessage from '@features/Chat/components/telegram/TelegramDocumentMessage';
import TelegramVoiceMessage from '@features/Chat/components/telegram/TelegramVoiceMessage';
import TelegramAnimationMessage from '@features/Chat/components/telegram/TelegramAnimationMessage';
import TelegramStickerMessage from '@features/Chat/components/telegram/TelegramStickerMessage';

export default function TelegramChatMessage(props: TelegramMessageProps) {
  const { messageData } = props;
  if (messageData.photo) {
    return <TelegramImageMessage {...props} />;
  }
  if (messageData.audio) {
    return <TelegramAudioMessage {...props} />;
  }
  if (messageData.voice) {
    return <TelegramVoiceMessage {...props} />;
  }
  if (messageData.video) {
    return <TelegramVideoMessage {...props} />;
  }
  if (messageData.animation) {
    return <TelegramAnimationMessage {...props} />;
  }
  if (messageData.document) {
    return <TelegramDocumentMessage {...props} />;
  }
  if (messageData.sticker) {
    return <TelegramStickerMessage {...props} />;
  }
  return <TelegramTextMessage {...props} />;
}
