import { ReceivedMessage } from '@domain/entities/chat/ReceivedMessage';
import { Message } from '@domain/entities/chat/Message';
import ReceivedMessageMapper from '@domain/mappers/ReceivedMessageMapper';
import { ZaloMessage } from '@domain/entities/chat/zalo/ZaloMessage';

export default class ZaloReceivedMessageMapper extends ReceivedMessageMapper {
  convert = (receivedMessage: ReceivedMessage) => {
    const messageData: ZaloMessage = JSON.parse(receivedMessage.messageData);
    // Timestamp returned by Telegram is in milliseconds
    const timestamp = new Date(receivedMessage.timestamp * 1000);
    const message: Message = {
      ...receivedMessage,
      timestamp,
      messageData,
      chatPlatform: 'zalo',
    };
    return message;
  }
}
