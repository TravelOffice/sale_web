import { chatRepository, s3Repository } from '@adapter/repositories';
import AttachmentMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/Conversation';
import { ChatPlatformSendMessage } from '@domain/entities/message-platforms/ChatPlatformSendMessage';
import { FacebookSendAttachmentMessageContent } from '@domain/entities/message-platforms/FbSendMessageContent';
import { ZaloSendAttachment, ZaloSendAttachmentMessage } from '@domain/entities/message-platforms/ZaloSendMessageContent';
import { getFileExtension } from '@utils/FileUtils';
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
  invoke = async (
    sender: string, file: File, fileType: AttachmentMessageType, conversation: Conversation,
  ) => {
    // Get new presign url
    const presignedData = await s3Repository.uploadChatAttachmentViaPresignedURL(
      sender, conversation.contact.id, file,
    );
    let messageData;
    if (conversation.chatPlatform === 'zalo') {
      // Upload file to chat flatform
      const { length, [length - 1]: fileName } = presignedData.url.split('/');
      const zaloFileType = (fileType === AttachmentMessageType.IMAGE && getFileExtension(file) === 'GIF') ? 'gif' : fileType;
      const zaloFileUploadResponse = await s3Repository.uploadFileToChatPlatform(
        sender,
        zaloFileType,
        conversation,
        presignedData.key,
        fileName,
      );
      const zaloAttachment = this.prepareZaloAttachmentMessageData(
        file,
        fileType,
        zaloFileUploadResponse.data.token || zaloFileUploadResponse.data.attachment_id,
      );
      messageData = {
        attachment: zaloAttachment,
      } as ZaloSendAttachmentMessage;
    } else if (conversation.chatPlatform === 'facebook') {
      // Send message
      messageData = {
        attachment: {
          type: fileType,
          payload: {
            is_reusable: true,
            url: presignedData.url,
          },
        },
      } as FacebookSendAttachmentMessageContent;
    } else {
      throw new Error('Chat platform is not supported.');
    }
    const message: ChatPlatformSendMessage = {
      sender,
      chatPlatform: conversation.chatPlatform,
      recipient: conversation.contact.id,
      customerId: conversation.contact.id,
      messageData,
    };
    await chatRepository.sendMessage(conversation.chatPlatform, message);
  };

  private prepareZaloAttachmentMessageData = (
    file: File, fileType: AttachmentMessageType, idOrToken: string,
  ): ZaloSendAttachment => {
    const fileExtension = getFileExtension(file);
    if (fileType === AttachmentMessageType.FILE) {
      if (fileExtension === 'DOC' || fileExtension === 'DOCX' || fileExtension === 'PDF') {
        return {
          payload: {
            token: idOrToken,
          },
          type: 'file',
        };
      }
      throw new Error(`File type ${fileExtension} is not supported for sending Zalo file attachment`);
    } if (fileType === AttachmentMessageType.IMAGE) {
      if (fileExtension === 'PNG' || fileExtension === 'JPG' || fileExtension === 'JPEG') {
        return {
          payload: {
            template_type: 'media',
            elements: [
              {
                media_type: 'image',
                attachment_id: idOrToken,
              },
            ],
          },
          type: 'template',
        };
      }
      if (fileExtension === 'GIF') {
        return {
          payload: {
            template_type: 'media',
            elements: [
              {
                media_type: 'gif',
                attachment_id: idOrToken,
              },
            ],
          },
          type: 'template',
        };
      }
      throw new Error(`Image type ${fileExtension} is not supported for sending Zalo image attachment`);
    }
    throw new Error(`File type ${fileType} is not supported for sending Zalo attachment`);
  }
}
