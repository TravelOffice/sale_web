import { Message } from '@domain/entities/Message';
import { Contact } from '@domain/entities/Contact';
import { ChatPlatform } from './ChatPlatform';

export interface Conversation {
  id: string,
  contact: Contact,
  unseenMessages: number,
  lastMessage?: Message,
  type: ChatPlatform
}
