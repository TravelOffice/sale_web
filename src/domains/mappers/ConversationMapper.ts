import { Contact } from '@domain/entities/Contact';
import { Conversation } from '@domain/entities/chat/Conversation';
import { ZaloConversation } from '@domain/entities/chat/zalo/ZaloConversation';
import { DDBTelegramConversation } from '@domain/entities/chat/telegram/DDBTelegramConversation';
import { getTelegramLastMessageTitle } from '@utils/ChatUtils';
import { DDBFacebookConversation } from '@domain/entities/chat/facebook/DDBFacebookConversation';

class ConversationMapper {
  fromFb = (ddbConversation: DDBFacebookConversation, pageId: string): Conversation => {
    const { info: conversation, assignee } = ddbConversation;
    const customer = conversation.participants.data.find((item: any) => item.id !== pageId)!;
    const contact: Contact = {
      id: customer.id,
      fullName: customer.name,
      avatar: '',
      about: '',
    };
    return {
      id: conversation.id,
      contact,
      lastMessage: {
        id: '',
        customerId: contact.id,
        recipient: '',
        sender: '',
        timestamp: new Date(conversation.updated_time),
        messageData: {
          text: conversation.snippet,
        },
        chatPlatform: 'facebook',
      },
      unseenMessages: 0,
      chatPlatform: 'facebook',
      assignee,
      pageId,
    };
  }

  fromZalo = (conversation: ZaloConversation, pageId: string): Conversation => {
    const {
      lastMessage, info, conversationId, assignee,
    } = conversation;
    const { name, avatar } = info;
    const contact: Contact = {
      id: conversationId,
      fullName: name,
      avatar,
      about: '',
    };
    return {
      id: contact.id,
      contact,
      lastMessage: {
        id: '',
        customerId: contact.id,
        recipient: lastMessage.to_id,
        sender: lastMessage.from_id,
        timestamp: new Date(lastMessage.time),
        messageData: {
          text: lastMessage.message || `${contact.fullName} has sent a message.`,
        },
        chatPlatform: 'zalo',
      },
      unseenMessages: 0,
      chatPlatform: 'zalo',
      pageId,
      assignee,
    };
  }

  /**
   * Map the Telegram conversation returned from backend to unified conversation object
   * @param conversation Telegram conversation data
   * @param botId Telegram bot id
   */
  fromTelegram = (conversation: DDBTelegramConversation, botId: string): Conversation => {
    const { assignee } = conversation;
    let customerName: string;
    const chatType = conversation.info.type;
    if (chatType === 'private') {
      // Individual user if chat type is private
      if (conversation.info.first_name && conversation.info.last_name) {
        customerName = `${conversation.info.first_name} ${conversation.info.last_name}`;
      } else {
        customerName = conversation.info.username || 'unknown';
      }
    } else {
      // Title as customer name, for supergroups, channels and group chats
      customerName = `${conversation.info.title}`;
    }
    const customerId = conversation.info.id.toString();
    const contact: Contact = {
      id: customerId,
      fullName: customerName,
      avatar: '',
      about: '',
    };
    return {
      id: conversation.conversationId,
      contact,
      lastMessage: {
        id: `${conversation.lastMessage.message_id}`,
        customerId,
        recipient: '',
        sender: '',
        timestamp: new Date(conversation.lastMessage.date * 1000),
        messageData: {
          ...conversation.lastMessage,
          text: getTelegramLastMessageTitle(conversation.lastMessage),
        },
        chatPlatform: 'telegram',
      },
      unseenMessages: 0,
      chatPlatform: 'telegram',
      assignee,
      pageId: botId,
    };
  }
}

const conversationMapper = new ConversationMapper();
export default conversationMapper;
