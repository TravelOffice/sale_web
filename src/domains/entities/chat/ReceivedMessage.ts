import { ChatPlatform } from '../ChatPlatform';

/**
 * This model represents incoming message.
 * It seems like the `Message` but `messageData` in JSON.
 */
export interface ReceivedMessage {
  id: string,
  timestamp: number,
  sender: string,
  recipient: string,
  customerId: string,
  chatPlatform: ChatPlatform,
  messageData: string,
}
