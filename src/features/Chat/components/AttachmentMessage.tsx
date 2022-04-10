import React from 'react';
import { AttachmentMessageProps } from '@features/Chat/components/AttachmentMessageProps';
import ImageMessage from '@features/Chat/components/ImageMessage';
import FileMessage from '@features/Chat/components/FileMessage';
import AudioMessage from '@features/Chat/components/AudioMessage';
import VideoMessage from '@features/Chat/components/VideoMessage';
import { isDocumentFile } from '@utils/ChatUtils';
import DocumentMessage from '@features/Chat/components/DocumentMessage';

export default function AttachmentMessage(props: AttachmentMessageProps) {
  const { message, attachment } = props;
  if (attachment.mimeType.startsWith('image/')) {
    return <ImageMessage attachment={attachment} message={message} />;
  }
  if (attachment.mimeType.startsWith('audio/')) {
    return <AudioMessage attachment={attachment} message={message} />;
  }
  if (attachment.mimeType.startsWith('video/')) {
    return <VideoMessage attachment={attachment} message={message} />;
  }
  if (isDocumentFile(attachment.mimeType)) {
    return <DocumentMessage attachment={attachment} message={message} />;
  }
  return <FileMessage attachment={attachment} message={message} />;
}
