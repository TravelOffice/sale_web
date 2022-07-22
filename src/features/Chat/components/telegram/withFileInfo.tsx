import React, { useMemo } from 'react';
import { TelegramMessageProps } from '@features/Chat/components/telegram/TelegramMessageProps';
import { File, TelegramMessage } from '@domain/entities/chat/telegram';
import { useQuery } from '@apollo/client';
import { telegramFileInfo } from '@graphql/queries';
import { usePage } from '@hooks/chat';

export type WithFileInfoProps = TelegramMessageProps & { fileInfo?: File, loading: boolean, };

export type WithFileInfoOptions = {
  getFileId: (messageData: TelegramMessage) => string,
};

export default function withFileInfo(
  WrappedComponent: React.ComponentType<WithFileInfoProps>,
  options: WithFileInfoOptions,
) {
  return (props: TelegramMessageProps) => {
    const { messageData } = props;
    const page = usePage('telegram')!;
    const variables = {
      fileId: options.getFileId(messageData),
      telegramConversationId: messageData.chat.id,
      telegramPageId: page.id,
    };
    const { data, loading } = useQuery(telegramFileInfo, { fetchPolicy: 'cache-first', variables });
    const fileInfo = useMemo(() => {
      if (data) {
        return JSON.parse(data.getTelegramFileInfo.data).fileInfo as File;
      }
      return undefined;
    }, [data]);
    return (
      <WrappedComponent fileInfo={fileInfo} loading={loading} {...props} />
    );
  };
}
