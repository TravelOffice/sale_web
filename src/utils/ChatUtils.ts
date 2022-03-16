import { MessageGroup } from '@features/Chat/ChatLog';
import { Message } from '@domain/entities/Message';

/**
 * Formats chat data based on sender
 */
export const formatChatData = (messages: Array<Message>) : Array<MessageGroup> => {
  const formattedChatLog : Array<MessageGroup> = [];
  let chatMessageSenderId = messages[0] ? messages[0].sender : undefined;
  if (!chatMessageSenderId) {
    return [];
  }
  let msgGroup : MessageGroup = {
    senderId: chatMessageSenderId,
    messages: [],
  };
  messages.forEach((message, index) => {
    if (chatMessageSenderId === message.sender) {
      msgGroup.messages.push(message);
    } else {
      chatMessageSenderId = message.sender;
      formattedChatLog.push(msgGroup);
      msgGroup = {
        senderId: message.sender,
        messages: [message],
      };
    }
    if (index === messages.length - 1) formattedChatLog.push(msgGroup);
  });
  return formattedChatLog;
};

export const sortMessages = (
  messages: Message[],
) : Message[] => [...messages].sort((m1, m2) => m1.timestamp.getTime() - m2.timestamp.getTime());
