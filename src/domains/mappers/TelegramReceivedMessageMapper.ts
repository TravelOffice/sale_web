import { AppSyncReceivedMessage } from '@domain/entities/chat/AppSyncReceivedMessage';
import { TelegramMessage } from '@domain/entities/chat/telegram';
import { Message } from '@domain/entities/chat/Message';
import ReceivedMessageMapper from '@domain/mappers/ReceivedMessageMapper';

export default class TelegramReceivedMessageMapper extends ReceivedMessageMapper {
  convert = (receivedMessage: AppSyncReceivedMessage) => {
    const messageData: TelegramMessage = JSON.parse(receivedMessage.messageData);
    // Timestamp returned by Telegram is in milliseconds
    const timestamp = new Date(receivedMessage.timestamp * 1000);
    // TODO: Sticker and file message are unsupported now because Telegram
    // returns file_id instead of an url.
    const message: Message = {
      ...receivedMessage,
      timestamp,
      messageData: {
        text: messageData.text || '',
      },
    };
    return message;
  }
}
