import React from 'react';
import withFileInfo, { WithFileInfoProps } from '@features/Chat/components/telegram/withFileInfo';
import StickerMessage from '@features/Chat/components/common/StickerMessage';

/**
 * Component to display a Telegram sticker message. The Telegram message is saved as .tgs
 * extension.
 * @param props
 * @constructor
 */
const TelegramStickerMessageWithFileInfo = (props: WithFileInfoProps) => {
  const { loading, fileInfo } = props;
  if (loading) return <></>;
  return <StickerMessage url={fileInfo?.file_path!} />;
};

const TelegramStickerMessage = withFileInfo(TelegramStickerMessageWithFileInfo, {
  getFileId: (messageData) => messageData.sticker?.thumb?.file_id!,
});

export default TelegramStickerMessage;
