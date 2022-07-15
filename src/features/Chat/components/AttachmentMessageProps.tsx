import { MessageAttachment } from '@domain/entities/chat/Message';
import { MessageProps } from '@features/Chat/components/MessageProps';

export interface AttachmentMessageProps extends MessageProps {
  attachment: MessageAttachment,
}
