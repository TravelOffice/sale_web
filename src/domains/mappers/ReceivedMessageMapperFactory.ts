import { AppSyncReceivedMessage } from '@domain/entities/chat/AppSyncReceivedMessage';
import FacebookReceivedMessageMapper from '@domain/mappers/FacebookReceivedMessageMapper';
import TelegramReceivedMessageMapper from '@domain/mappers/TelegramReceivedMessageMapper';
import ReceivedMessageMapper from '@domain/mappers/ReceivedMessageMapper';

export default class ReceivedMessageMapperFactory {
  static getMapper = (
    receivedMessage: AppSyncReceivedMessage,
  ): ReceivedMessageMapper | undefined => {
    if (receivedMessage.chatPlatform === 'facebook') {
      return new FacebookReceivedMessageMapper();
    }
    if (receivedMessage.chatPlatform === 'telegram') {
      return new TelegramReceivedMessageMapper();
    }
    // TODO: Zalo is now unsupported
    return undefined;
  }
}
