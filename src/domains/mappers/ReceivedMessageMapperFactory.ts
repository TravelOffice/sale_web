import { ReceivedMessage } from '@domain/entities/chat/ReceivedMessage';
import FacebookReceivedMessageMapper from '@domain/mappers/FacebookReceivedMessageMapper';
import TelegramReceivedMessageMapper from '@domain/mappers/TelegramReceivedMessageMapper';
import ReceivedMessageMapper from '@domain/mappers/ReceivedMessageMapper';
import ZaloReceivedMessageMapper from './ZaloReceivedMessageMapper';

export default class ReceivedMessageMapperFactory {
  static getMapper = (receivedMessage: ReceivedMessage): ReceivedMessageMapper | undefined => {
    if (receivedMessage.chatPlatform === 'facebook') {
      return new FacebookReceivedMessageMapper();
    }
    if (receivedMessage.chatPlatform === 'zalo') {
      return new ZaloReceivedMessageMapper();
    }
    if (receivedMessage.chatPlatform === 'telegram') {
      return new TelegramReceivedMessageMapper();
    }
    return undefined;
  }
}
