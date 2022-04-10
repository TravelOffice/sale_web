import React from 'react';
import { MessageProps } from '@features/Chat/components/MessageProps';

export interface StickerMessageProps extends MessageProps {}

export default function StickerMessage(props: StickerMessageProps) {
  const { message } = props;
  const url = message.messageData.sticker?.link!;
  return (
    <img width={150} height={150} className="chat-content" key={message.id} src={url} alt="" />
  );
}
