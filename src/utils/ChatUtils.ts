import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { Message } from '@domain/entities/chat/Message';
import { Page } from '@domain/entities/chat/Page';
import { TelegramMessage } from '@domain/entities/chat/telegram';
import { MessageGroup } from '@features/Chat/ChatLog';
import { store } from '@redux/store';
import i18next from 'i18next';

export const PAGE_SIZE = 10;

export const SUPPORTED_DOCUMENT_FILE_TYPES = [
  // Excel / Sheet
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
  'application/vnd.ms-excel', // xls
  'application/wps-office.xlsx',
  // Doc / Word
  'application/msword', // doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  'application/wps-office.docx',
  // Presentation / PowerPoint
  'application/vnd.ms-powerpoint', // ppt
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
  'application/wps-office.pptx',
];

/**
 * Formats chat data based on sender
 */
export const groupMessages = (messages: Array<Message>): Array<MessageGroup> => {
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
  const regEx = /([a-zA-Z\d\s_\\.\-:])+\.+(?:doc|docx|ppt|pptx|xls|xlsx|txt|rtf|pdf)$/;
  return SUPPORTED_DOCUMENT_FILE_TYPES.includes(mimeType) || regEx.test(fileName);
};

export const normalizeVietnameseName = (name: string) => {
  let normalizedName;
  // Convert to canonical decomposition form
  normalizedName = name.normalize('NFD');
  // Remove canonical characters
  normalizedName = normalizedName.replace(/[\u0300-\u036f]/g, '');
  // Replace đ/Đ to d/D characters
  normalizedName = normalizedName.replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D'));

  return normalizedName;
};

export const getPage = (
  linkedPages: Page[],
  platform: ChatPlatform,
) => linkedPages.find((page) => page.platform === platform);

export const getPageFromRedux = (platform: ChatPlatform) => {
  const { linkedPages } = store.getState().auth;
  return getPage(linkedPages, platform);
};

export const isMyMessage = (message: Message) => {
  const pageId = getPageFromRedux(message.chatPlatform)?.id;
  return pageId && pageId === message.sender;
};

/**
 * Get last message title of given Telegram conversation
 * @param message Telegram message object
 * @returns Title to show for last message at conversation box
 */
export const getTelegramLastMessageTitle = (message: TelegramMessage): string => {
  if (message.pinned_message) {
    return i18next.t('CHAT.PINNED_MESSAGE_TITLE');
  }
  if (message.video || message.audio || message.voice || message.photo) {
    return i18next.t('CHAT.MEDIA_MESSAGE_TITLE');
  }
  if (message.document) {
    return i18next.t('CHAT.DOCUMENT_MESSAGE_TITLE');
  }
  return message.text || '';
};

export const isImageMessage = (message: Message) => {
  if (message.chatPlatform === 'facebook' || message.chatPlatform === 'zalo') {
    const { attachments } = message.messageData;
    if (attachments && attachments.length > 0) {
      const { mimeType } = attachments[0];
      return mimeType.startsWith('image/');
    }
  }
  // TODO: Telegram is unsupported now
  return false;
};

/**
 * Get all image sources from messages
 * @param messages the Message list
 */
export const getImageSources = (messages: Message[]) => {
  type ImageSource = { messageId: string, src: string, alt: string };
  const imageSources : ImageSource[] = [];
  messages.forEach((message) => {
    if (message.chatPlatform === 'facebook' || message.chatPlatform === 'zalo') {
      const { attachments } = message.messageData;
      if (attachments && attachments.length > 0 && attachments[0].mimeType.startsWith('image/')) {
        const [mAttachment] = message.messageData.attachments!;
        imageSources.push({ messageId: message.id, src: mAttachment.url || '', alt: mAttachment.name });
      }
    }
  });
  return imageSources;
};
