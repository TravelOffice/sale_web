import { ReceivedMessage } from '@domain/entities/chat/ReceivedMessage';
import { Message } from '@domain/entities/chat/Message';

export default abstract class ReceivedMessageMapper {
  abstract convert: (receivedMessage: ReceivedMessage) => Message
}
