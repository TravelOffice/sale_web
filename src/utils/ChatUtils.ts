import { MessageGroup } from '@features/Chat/ChatLog';
import { Message } from '@domain/entities/Message';

export const PAGE_SIZE = 10;

export const SUPPORTED_DOCUMENT_FILE_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
  'application/vnd.ms-excel', // xls
  'application/msword', // doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  'application/vnd.ms-powerpoint', // ppt
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
];

/**
 * Formats chat data based on sender
 */
export const formatChatData = (messages: Array<Message>): Array<MessageGroup> => {
  const formattedChatLog: Array<MessageGroup> = [];
  let chatMessageSenderId = messages[0] ? messages[0].sender : undefined;
  if (!chatMessageSenderId) {
    return [];
  }
  let msgGroup: MessageGroup = {
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
): Message[] => [...messages].sort(
  (m1, m2) => m1.timestamp.getTime() - m2.timestamp.getTime(),
); // ([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$

export const isDocumentFile = (mimeType: string, fileName: string) => {
  const regEx = /([a-zA-Z0-9\s_\\.\-:])+\.+(?:doc|docx|ppt|pptx|xls|xlsx|txt|rtf|pdf)$/;
  return SUPPORTED_DOCUMENT_FILE_TYPES.includes(mimeType) || regEx.test(fileName);
};
