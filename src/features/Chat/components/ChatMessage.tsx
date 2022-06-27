import React from 'react';
import StickerMessage from '@features/Chat/components/StickerMessage';
import TextMessage from '@features/Chat/components/TextMessage';
import { MessageProps } from '@features/Chat/components/MessageProps';
import AttachmentsMessage from '@features/Chat/components/AttachmentsMessage';
import UnsupportedMessage from './UnsupportedMessage';

export default function ChatMessage(props: MessageProps) {
  const { message, onClick } = props;
  if (message.isUnsupported) {
    return <UnsupportedMessage message={message} />;
  }
  if (message.messageData.attachments) {
    return <AttachmentsMessage message={message} onClick={onClick} />;
  }
  if (message.messageData.sticker) {
    return <StickerMessage message={message} />;
  }
  return <TextMessage message={message} />;
}
