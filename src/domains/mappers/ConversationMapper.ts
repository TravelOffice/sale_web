import { Contact } from '@domain/entities/Contact';
import { Conversation } from '@domain/entities/Conversation';
import { FacebookConversation } from '@domain/entities/FacebookConversation';
import { ZaloConversation } from '@domain/entities/ZaloConversation';

class ConversationMapper {
  fromFb = (conversation: FacebookConversation, pageId: string) : Conversation => {
    const customer = conversation.participants.data.find((item: any) => item.id !== pageId)!;
    const contact : Contact = {
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
    };
  }

  fromZalo = (conversation: ZaloConversation, pageId: string) : Conversation => {
    const fromPage = pageId === conversation.from_id;
    const id = fromPage ? conversation.to_id : conversation.from_id;
    const name = fromPage ? conversation.to_display_name : conversation.from_display_name;
    const avatar = fromPage ? conversation.to_avatar : conversation.from_avatar;
    const contact : Contact = {
      id,
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
        recipient: conversation.to_id,
        sender: conversation.from_id,
        timestamp: new Date(conversation.time),
        messageData: {
          text: conversation.message || `${contact.fullName} has sent a message.`,
        },
        chatPlatform: 'zalo',
      },
      unseenMessages: 0,
      chatPlatform: 'zalo',
    };
  }
}

const conversationMapper = new ConversationMapper();
export default conversationMapper;
