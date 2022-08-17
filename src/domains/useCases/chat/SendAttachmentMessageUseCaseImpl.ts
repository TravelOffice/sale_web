import { chatRepository, s3Repository } from '@adapter/repositories';
import SendMessageType from '@domain/entities/chat/AttachmentMessageType';
import { Conversation } from '@domain/entities/chat/Conversation';
import { ChatPlatformSendMessage, ZaloSendMessage } from '@domain/entities/chat/ChatPlatformSendMessage';
import { FacebookSendAttachmentMessageContent } from '@domain/entities/chat/facebook/FbSendMessageContent';
import { ZaloSendAttachment, ZaloSendAttachmentMessage } from '@domain/entities/chat/zalo/ZaloSendMessageContent';
import { getFileExtension } from '@utils/FileUtils';
import { TelegramSendMessageContent } from '@domain/entities/chat/telegram/sendMessage/TelegramSendMessageContent';
import { PresignedUrl } from '@domain/entities/chat/PresignedUrl';
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
    sender: string, file: File, fileType: SendMessageType, conversation: Conversation,
  ) => {
    // Get new presign url
    const presignedData = await s3Repository.uploadChatAttachmentViaPresignedURL(
      sender, conversation.contact.id, file,
    );
    switch (conversation.chatPlatform) {
      case 'zalo':
        await this.sendZaloAttachmentMessage(fileType, presignedData, file, sender, conversation);
        break;
      case 'facebook':
        await this.sendFacebookAttachmentMessage(fileType, presignedData.cdn, sender, conversation);
        break;
      case 'telegram':
        await this.sendTelegramAttachmentMessage(fileType, presignedData.cdn, sender, conversation);
        break;
      default:
        break;
    }
  };

  private sendZaloAttachmentMessage = async (
    fileType: SendMessageType,
    presignedData: PresignedUrl,
    file: File,
    sender: string,
    conversation: Conversation,
  ) => {
    // Upload file to chat flatform
    const { length, [length - 1]: fileName } = presignedData.url.split('/');
    const zaloFileType = (fileType === SendMessageType.IMAGE && getFileExtension(file) === 'GIF') ? 'gif' : fileType;
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
    const messageData = {
      attachment: zaloAttachment,
    } as ZaloSendAttachmentMessage;

    const message: ZaloSendMessage = {
      sender,
      chatPlatform: conversation.chatPlatform,
      recipient: conversation.contact.id,
      customerId: conversation.contact.id,
      messageData,
    };
    await chatRepository.sendMessage(
      conversation.chatPlatform,
      conversation.id,
      message,
    );
  }

  private sendFacebookAttachmentMessage = async (
    fileType: SendMessageType,
    cdnUrl: string,
    sender: string,
    conversation: Conversation,
  ) => {
    // Send message
    const messageData = {
      attachment: {
        type: fileType,
        payload: {
          is_reusable: true,
          url: cdnUrl,
        },
      },
    } as FacebookSendAttachmentMessageContent;
    const message: ChatPlatformSendMessage = {
      sender,
      chatPlatform: 'facebook',
      recipient: conversation.contact.id,
      customerId: conversation.contact.id,
      messageData,
    };
    await chatRepository.sendMessage(
      conversation.chatPlatform,
      conversation.id,
      message,
    );
  }

  private sendTelegramAttachmentMessage = async (
    fileType: SendMessageType,
    cdn: string,
    sender: string,
    conversation: Conversation,
  ) => {
    // Send message
    const messageData = {
      messageType: fileType,
      attachment: cdn,
      // TODO need add options and fileOptions in the feature
    } as TelegramSendMessageContent;
    const message: ChatPlatformSendMessage = {
      sender,
      chatPlatform: 'telegram',
      recipient: conversation.id,
      customerId: conversation.contact.id,
      messageData,
    };
    await chatRepository.sendMessage(
      conversation.chatPlatform,
      conversation.id,
      message,
    );
  }

  private prepareZaloAttachmentMessageData = (
    file: File, fileType: SendMessageType, idOrToken: string,
  ): ZaloSendAttachment => {
    const fileExtension = getFileExtension(file);
    if (fileType === SendMessageType.FILE) {
      if (fileExtension === 'DOC' || fileExtension === 'DOCX' || fileExtension === 'PDF') {
        return {
          payload: {
            token: idOrToken,
          },
          type: 'file',
        };
      }
      throw new Error(`File type ${fileExtension} is not supported for sending Zalo file attachment`);
    } if (fileType === SendMessageType.IMAGE) {
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
