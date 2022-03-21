import { FacebookMessage } from '@domain/entities/FacebookMessage';
import { Message } from '@domain/entities/Message';
import { ZaloMessage } from '@domain/entities/ZaloMessage';
import { store } from '@redux/store';

class MessageMapper {
  fromFacebookMessage = (fbMessage: FacebookMessage) : Message => {
    const fbPageId = store.getState().auth.facebookPage?.id!;
    const recipient = fbMessage.to.data[0].id;
    const customerId = fbPageId === fbMessage.from.id ? recipient : fbMessage.from.id;
    return {
      id: fbMessage.id,
      customerId,
      recipient,
      sender: fbMessage.from.id,
      timestamp: new Date(fbMessage.created_time),
      messageData: {
        text: fbMessage.message,
      },
    };
  }

  fromZaloMessage = (zaloMessage: ZaloMessage) : Message => {
    const zaloPageId = store.getState().auth.zaloPage?.id!;
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
    };
  }
}

const messageMapper = new MessageMapper();
export default messageMapper;
