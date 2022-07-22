import { MessageAttachment } from '@domain/entities/chat/Message';
import { FacebookMessageProps } from '@features/Chat/components/facebookZalo/FacebookMessageProps';

export interface FacebookAttachmentMessageProps extends FacebookMessageProps {
  attachment: MessageAttachment,
}
