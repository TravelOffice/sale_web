import { Message } from '@domain/entities/Message';

export interface MessageProps {
  message: Message,
  onClick?: (message: Message) => void,
}
