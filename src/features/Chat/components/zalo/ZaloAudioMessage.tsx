import React, { useMemo } from 'react';
import AudioMessage from '@features/Chat/components/common/AudioMessage';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';
import { usePage } from '@hooks/chat';
import { useQuery } from '@apollo/client';
import { zaloAudio } from '@graphql/queries';
import { ZaloReceivedAudioMessage } from '@domain/entities/chat/Message';
import { SUPPORTED_AUDIO_EXTENSIONS } from '@utils/Constants';

export default function ZaloAudioMessage(props: ZaloMessageProps) {
  const { messageData } = props;
  const page = usePage('zalo')!;
  const conversationId = page.id === messageData.from_id ? messageData.from_id : messageData.to_id;
  const fileUrl = (messageData.attachments?.[0] as ZaloReceivedAudioMessage).payload.url;
  const fileExtension = String(fileUrl.split('.').pop());
  if (SUPPORTED_AUDIO_EXTENSIONS.includes(fileExtension)) {
    return (
      <AudioMessage url={fileUrl} />
    );
  }
  const { data } = useQuery(zaloAudio, {
    variables: {
      conversationId,
      fileUrl,
      messageId: messageData.msg_id,
      pageId: page.id,
    },
  });
  const url = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return fileUrl;
  }, [data]);
  return (
    <AudioMessage url={url} />
  );
}
