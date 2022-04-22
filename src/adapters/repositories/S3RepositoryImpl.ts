import { apiProvider } from '@adapter/infrastructures';
import { Conversation } from '@domain/entities/Conversation';
import { S3Repository } from './interfaces/S3Repository';

export default class S3RepositoryImpl implements S3Repository {
  uploadChatAttachmentViaPresignedURL = async (pageId: string, customerId: string, file: File) => {
    // Get presign url by calling api
    const response = await apiProvider.authorizedRequest.get('/presigned-url', {
      queryParams: {
        pageId,
        customerId,
        fileType: file.type,
        fileName: file.name,
      },
    });
    const attachmentUrl: string = response.data.url;

    // Upload to given url
    await fetch(attachmentUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    return {
      url: attachmentUrl.split('?')[0],
      key: response.data.key,
    };
  }

  uploadFileToChatPlatform = async (
    sender: string,
    fileType: string,
    conversation: Conversation,
    fileKey: string,
    fileName: string,
  ) => {
    const response = await apiProvider.authorizedRequest.get('/upload-file-to-chat-platform', {
      queryParams: {
        pageId: sender,
        fileKey,
        fileName,
        chatPlatform: conversation.chatPlatform,
        fileType,
      },
    });
    return response.data;
  }
}
