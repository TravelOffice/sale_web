import { Message } from './Message';

/**
 * This model represents incoming message.
 * It seems like the `Message` but `messageData` in JSON.
 */
export type AppSyncReceivedMessage =
  Omit<Message, 'messageData' | 'isUnsupported' | 'timestamp'> & {
    messageData: string,
    timestamp: number,
  };
