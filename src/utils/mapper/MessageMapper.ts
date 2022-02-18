import { MessageResponse } from '@domain/entities/MessageResponse';
import { Message } from '@domain/entities/Message';

// eslint-disable-next-line import/prefer-default-export
export const toMessage = (response: MessageResponse) : Message => ({
  customerId: response.customerId,
  sender: response.sender,
  recipient: response.recipient,
  messageData: JSON.parse(response.messageData),
  timestamp: response.timestamp ? new Date(response.timestamp) : new Date(),
});

export const filterMessagesByCustomer = (
  messages: Message[], customerId: string,
) : Message[] => messages.filter((message) => message.customerId === customerId);
