import React from 'react';

export interface StickerMessageProps {
  url: string,
}

/**
 * Component to display a sticker message
 * @param props
 * @constructor
 */
export default function StickerMessage(props: StickerMessageProps) {
  const { url } = props;
  return (
    <img width={150} height={150} className="chat-content" src={url} alt="" />
  );
}
