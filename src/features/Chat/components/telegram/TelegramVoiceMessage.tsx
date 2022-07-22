import React from 'react';
import withFileInfo, { WithFileInfoProps } from '@features/Chat/components/telegram/withFileInfo';
import AudioMessage from '@features/Chat/components/common/AudioMessage';

/**
 * Component to display Telegram voice message
 * @param props
 * @constructor
 */
const TelegramVoiceMessageWithFileInfo = (props: WithFileInfoProps) => {
  const { loading, fileInfo } = props;
  return (
    <>
      {!loading && <AudioMessage url={fileInfo?.file_path} />}
    </>
  );
};

const TelegramVoiceMessage = withFileInfo(TelegramVoiceMessageWithFileInfo, {
  getFileId: (messageData) => messageData.voice?.file_id!,
});

export default TelegramVoiceMessage;
