import { AppSyncReceivedMessage } from '@domain/entities/chat/AppSyncReceivedMessage';
import { Message } from '@domain/entities/chat/Message';

export default abstract class ReceivedMessageMapper {
  abstract convert: (receivedMessage: AppSyncReceivedMessage) => Message
}
