import React from 'react';
import withFileInfo, { WithFileInfoProps } from '@features/Chat/components/telegram/withFileInfo';
import DocumentMessage from '@features/Chat/components/common/DocumentMessage';
import { TelegramMessage } from '@domain/entities/chat/telegram';
import { SUPPORTED_DOCUMENT_FILE_TYPES } from '@utils/ChatUtils';
import FileMessage from '@features/Chat/components/common/FileMessage';
import { WithRequired } from '@utils/WithRequired';

const TelegramDocumentMessageWithFileInfo = (props: WithFileInfoProps) => {
  const { loading, fileInfo, messageData } = props;
  const { document } = messageData as WithRequired<TelegramMessage, 'document'>;
  const { mime_type: mimeType } = document;
  if (loading) return <></>;
  if (SUPPORTED_DOCUMENT_FILE_TYPES.includes(mimeType!)) {
    return <DocumentMessage url={fileInfo!.file_path} fileName={messageData.document!.file_name} />;
  }
  return <FileMessage url={fileInfo!.file_path} fileName={messageData.document!.file_name} />;
};

const TelegramDocumentMessage = withFileInfo(TelegramDocumentMessageWithFileInfo, {
  getFileId: (messageData) => messageData.document?.file_id!,
});

export default TelegramDocumentMessage;
