import React from 'react';
import withFileInfo, { WithFileInfoProps } from '@features/Chat/components/telegram/withFileInfo';
import VideoMessage from '@features/Chat/components/common/VideoMessage';
import { TelegramMessage } from '@domain/entities/chat/telegram';
import { WithRequired } from '@utils/WithRequired';

/**
 * Component to display GIF from Telegram
 * @param props
 * @constructor
 */
const TelegramAnimationMessageWithFileInfo = (props: WithFileInfoProps) => {
  const { fileInfo, messageData, loading } = props;
  const { animation } = messageData as WithRequired<TelegramMessage, 'animation'>;
  return (
    <>
      {
        !loading && (
          <VideoMessage
            url={fileInfo?.file_path}
            width={animation.width}
            height={animation.height}
            autoplay
            controls={false}
            loop
          />
        )
      }
    </>
  );
};

const TelegramAnimationMessage = withFileInfo(TelegramAnimationMessageWithFileInfo, {
  getFileId: (messageData) => messageData.animation?.file_id!,
});

export default TelegramAnimationMessage;
