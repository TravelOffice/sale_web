import React, { useMemo } from 'react';
import AudioMessage from '@features/Chat/components/common/AudioMessage';
import { ZaloMessageProps } from '@features/Chat/components/zalo/ZaloMessageProps';
import { usePage } from '@hooks/chat';
import { useQuery } from '@apollo/client';
import { zaloAudio } from '@graphql/queries';

export default function ZaloAudioMessage(props: ZaloMessageProps) {
  const { messageData } = props;
  const page = usePage('zalo')!;
  const conversationId = page.id === messageData.from_id ? messageData.from_id : messageData.to_id;
  const { data } = useQuery(zaloAudio, {
    variables: {
      conversationId,
      fileUrl: messageData.url,
      messageId: messageData.message_id,
      pageId: page.id,
    },
  });
  const url = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return JSON.parse(data.getZaloAudio.data).data;
  }, [data]);
  return (
    <AudioMessage url={url} />
  );
}
