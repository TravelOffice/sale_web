import { Message } from '@domain/entities/chat/Message';
import { Contact } from '@domain/entities/Contact';
import { ChatPlatform } from './ChatPlatform';

export interface Conversation {
  id: string,
  contact: Contact,
  unseenMessages: number,
  lastMessage?: Message,
  chatPlatform: ChatPlatform
}
