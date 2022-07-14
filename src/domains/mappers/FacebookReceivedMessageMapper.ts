import { ReceivedMessage } from '@domain/entities/chat/ReceivedMessage';
import { Message } from '@domain/entities/chat/Message';
import ReceivedMessageMapper from '@domain/mappers/ReceivedMessageMapper';

export default class FacebookReceivedMessageMapper extends ReceivedMessageMapper {
  convert = (message: ReceivedMessage) => {
    const messageData = JSON.parse(message.messageData);
    if (messageData.attachments && messageData.attachments.length > 0) {
      messageData.attachments = messageData.attachments.map((attachment: any) => {
        // Transform original data
        const { type, payload, ...modifiedAttachment } = attachment;
        const [fileUri] = payload.url.split('?');
        const { length, [length - 1]: fileName } = fileUri.split('/');
        modifiedAttachment.mimeType = `${type}/*`;
        modifiedAttachment.url = payload.url;
        modifiedAttachment.name = fileName;

        return modifiedAttachment;
      });
    }

    return {
      ...message,
      messageData,
      timestamp: new Date(message.timestamp),
    } as Message;
  }
}
