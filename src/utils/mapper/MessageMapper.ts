import { Message } from '@domain/entities/Message';

// eslint-disable-next-line import/prefer-default-export
export const filterMessagesByCustomer = (
  messages: Message[], customerId: string,
) : Message[] => messages.filter((message) => message.customerId === customerId);
