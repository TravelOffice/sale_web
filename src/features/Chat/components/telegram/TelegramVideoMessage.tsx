import React from 'react';
import withFileInfo, { WithFileInfoProps } from '@features/Chat/components/telegram/withFileInfo';
import VideoMessage from '@features/Chat/components/common/VideoMessage';
import { TelegramMessage } from '@domain/entities/chat/telegram';
import { WithRequired } from '@utils/WithRequired';

const TelegramVideoMessageWithFileInfo = (props: WithFileInfoProps) => {
  const { fileInfo, messageData, loading } = props;
  const { video } = messageData as WithRequired<TelegramMessage, 'video'>;
  return (
    <>
      {
        !loading && (
          <VideoMessage url={fileInfo?.file_path} width={video.width} height={video.height} />
        )
      }
    </>
  );
};

const TelegramVideoMessage = withFileInfo(TelegramVideoMessageWithFileInfo, {
  getFileId: (messageData) => messageData.video?.file_id!,
});

export default TelegramVideoMessage;
