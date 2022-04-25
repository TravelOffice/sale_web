import { chatRepository, s3Repository } from '@adapter/repositories';
import { Conversation } from '@domain/entities/Conversation';
import { ChatPlatformSendMessage } from '@domain/entities/message-platforms/ChatPlatformSendMessage';
import { FacebookSendAttachmentMessageContent } from '@domain/entities/message-platforms/FbSendMessageContent';
import { SendAttachmentMessageUseCase } from '../interfaces/chat/SendAttachmentMessageUseCase';

export default class SendAttachmentMessageUseCaseImpl implements SendAttachmentMessageUseCase {
  /**
   * Invoke to send the attachment message to user.
   * Flow of this feature is described as following steps
   * 1. Web application generate S3 presign url
   * 2. Attachment is uploaded to S3 by using S3 presign url
   * 3. Send attachement message to message platform such as Zalo or Facebook
   * @param file Attachment to send to chat user
   * @param message Message information
   * @param conversation Conversation containing given message
   */
  invoke = async (sender: string, file: File, conversation: Conversation) => {
    if (conversation.chatPlatform === 'facebook') {
      // Get new presign url
      const presignedUrl = await s3Repository.uploadChatAttachmentViaPresignedURL(
        sender, conversation.contact.id, file,
      );

      // Send message
      const messageData: FacebookSendAttachmentMessageContent = {
        attachment: {
          type: 'file', // TODO: Support more type such as image / audio / video
          payload: {
            is_reusable: true,
            url: presignedUrl,
          },
        },
      };
      const message: ChatPlatformSendMessage = {
        chatPlatform: 'facebook',
        sender,
        recipient: conversation.contact.id,
        customerId: conversation.contact.id,
        messageData,
      };
      await chatRepository.sendMessage(conversation.chatPlatform, message);
    } else {
      console.log('Send Zalo attachment is not supported yet!');
    }
  };
}
