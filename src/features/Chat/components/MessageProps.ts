import { Message } from '@domain/entities/chat/Message';

export interface MessageProps {
  message: Message,
  onClick?: (message: Message) => void,
}
