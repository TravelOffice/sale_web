import { FacebookMessage } from '@domain/entities/chat/facebook/FacebookMessage';
import { Message } from '@domain/entities/chat/Message';
import { ZaloMessage } from '@domain/entities/chat/zalo/ZaloMessage';
import messageAttachmentMapper from '@domain/mappers/MessageAttachmentMapper';
import { getPageFromRedux } from '@utils/ChatUtils';

class MessageMapper {
  fromFacebookMessage = (fbMessage: FacebookMessage): Message => {
    const fbPageId = getPageFromRedux('facebook')?.id!;
    const recipient = fbMessage.to.data[0].id;
    const customerId = fbPageId === fbMessage.from.id ? recipient : fbMessage.from.id;
    const attachments = fbMessage.attachments?.data.map(
      (attachment) => messageAttachmentMapper.fromFacebook(attachment),
    );
    const sticker = !fbMessage.message && fbMessage.shares ? fbMessage.shares?.data[0] : undefined;
    return {
      id: fbMessage.id,
      customerId,
      recipient,
      sender: fbMessage.from.id,
      timestamp: new Date(fbMessage.created_time),
      messageData: {
        text: fbMessage.message,
        attachments,
        sticker,
      },
      chatPlatform: 'facebook',
    };
  }

  fromZaloMessage = (zaloMessage: ZaloMessage): Message => {
    const zaloPageId = getPageFromRedux('zalo')?.id!;
    const customerId = zaloMessage.from_id === zaloPageId ? zaloMessage.to_id : zaloMessage.from_id;
    return {
      id: zaloMessage.message_id,
      customerId,
      recipient: zaloMessage.to_id,
      sender: zaloMessage.from_id,
      timestamp: new Date(zaloMessage.time),
      messageData: {
        text: zaloMessage.message,
      },
      chatPlatform: 'zalo',
      isUnsupported: zaloMessage.type === 'nosupport', // Zalo unsupported message
    };
  }
}

const messageMapper = new MessageMapper();
export default messageMapper;
