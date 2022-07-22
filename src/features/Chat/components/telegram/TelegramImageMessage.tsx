import React from 'react';
import { PhotoSize, TelegramMessage } from '@domain/entities/chat/telegram';
import ImageMessage from '@features/Chat/components/common/ImageMessage';
import withFileInfo, { WithFileInfoProps } from '@features/Chat/components/telegram/withFileInfo';
import { WithRequired } from '@utils/WithRequired';

/**
 * Get optimized image from Telegram. When an image is sent to Telegram, it should
 * be optimized for several sizes. For example, with the original image with size 1080x1080,
 * the Telegram should create the following sizes:
 * - 90x90
 * - 320x320
 * - 800x800
 * - 1080x1080
 * The original image has the best quality, but it's higher cost in time and data transfer.
 * The smallest isn't suitable do display in the web. So, for temporary solution, an image with
 * size 800 is optimized for reducing cost and ensure it's viewable for the user.
 * @param photos list of photos which already sorted
 */
function getPhoto(photos: PhotoSize[]) {
  let returnedPhoto: PhotoSize = photos[0];
  for (let i = 1; i < photos.length; i += 1) {
    const photo = photos[i];
    const max = Math.max(photo.width, photo.height);
    if (max > 800) break; // Get optimized image which has maximum edge is less than 800px
    returnedPhoto = photo;
  }
  return returnedPhoto;
}

const TelegramImageMessageWithFileInfo = (props: WithFileInfoProps) => {
  const { loading, fileInfo, messageData } = props;
  const { photo: photos } = messageData as WithRequired<TelegramMessage, 'photo'>;
  const photo = getPhoto(photos);
  const { width, height } = photo;
  return (
    <>
      {
        !loading && (
          <ImageMessage
            url={fileInfo?.file_path}
            alt={photo.file_id}
            width={width}
            height={height}
          />
        )
      }
    </>
  );
};

const TelegramImageMessage = withFileInfo(TelegramImageMessageWithFileInfo, {
  getFileId: (messageData) => getPhoto(messageData.photo!).file_id,
});

export default TelegramImageMessage;
