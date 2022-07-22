import { Message } from '@domain/entities/chat/Message';

export interface MessageProps<T> {
  message: Message,
  messageData: T,
  onClick?: (message: Message) => void,
}
