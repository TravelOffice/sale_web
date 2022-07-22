import React from 'react';
import withFileInfo, { WithFileInfoProps } from '@features/Chat/components/telegram/withFileInfo';
import AudioMessage from '@features/Chat/components/common/AudioMessage';

/**
 * Component to display an audio message from Telegram
 * @param props
 * @constructor
 */
const TelegramAudioMessageWithFileInfo = (props: WithFileInfoProps) => {
  const { loading, fileInfo } = props;
  return (
    <>
      {!loading && <AudioMessage url={fileInfo?.file_path} />}
    </>
  );
};

const TelegramAudioMessage = withFileInfo(TelegramAudioMessageWithFileInfo, {
  getFileId: (messageData) => messageData.audio?.file_id!,
});

export default TelegramAudioMessage;
