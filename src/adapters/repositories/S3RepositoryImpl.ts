import { apiProvider, mailApiProvider } from '@adapter/infrastructures';
import { Conversation } from '@domain/entities/chat/Conversation';
import { PresignedUrl, PresignedUrlTypes } from '@domain/entities/chat/PresignedUrl';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';
import { S3Repository } from './interfaces/S3Repository';

export default class S3RepositoryImpl implements S3Repository {
  uploadChatAttachmentViaPresignedURL = async (
    pageId: string,
    customerId: string,
    file: File,
  ) => {
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
      key: response.data.key,
      url: attachmentUrl.split('?')[0],
      cdn: response.data.cdn,
    } as PresignedUrl;
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

  uploadHtmlContentViaPresignedURL = async (htmlContent: string) => {
    // Get pre-sign url by calling api
    const contentType = 'text/html';
    const response = await mailApiProvider.authorizedRequest.get('/presigned-url', {
      queryParams: {
        contentType,
        fileName: 'htmlContent/index.html',
      },
    });
    const { url, key } = response;
    // Upload html content to s3
    await fetch(url, {
      method: 'PUT',
      body: new Blob([htmlContent], {
        type: contentType,
      }),
      headers: {
        'Content-Type': contentType,
      },
    });
    // Upload to given url
    return key;
  }

  uploadMailAttachmentViaPresignedURL = async (file: File) => {
    // Get pre-sign url by calling api
    const response = await mailApiProvider.authorizedRequest.get('/presigned-url', {
      queryParams: {
        contentType: file.type,
        fileName: file.name,
      },
    });
    const { url, key } = response;
    // Upload html content to s3
    await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    // Upload to given url
    return {
      name: file.name,
      mimeType: file.type,
      path: key,
      size: file.size,
      uploading: false,
    } as MailAttachment;
  }

  uploadPaymentVoucherAttachmentViaPresignedURL = async (file: File) => {
    // Get pre-sign url by calling api
    const response = await apiProvider.authorizedRequest.get('/payment-vouchers/presigned-url', {
      queryParams: {
        fileType: file.type,
        fileName: file.name,
      },
    });
    const attachmentUrl: string = response.data.cdn;

    // Upload html content to s3
    await fetch(attachmentUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    // Upload to given url
    return {
      key: response.data.key,
      url: attachmentUrl,
      cdn: response.data.cdn,
    } as PresignedUrl;
  }

  uploadAvatarAttachmentViaPresignedURL = async (file: File) => {
    // Get pre-sign url by calling api
    const response = await apiProvider.authorizedRequest.get('/me/avatar/presigned-url', {
      queryParams: {
        fileType: file.type,
        fileName: file.name,
      },
    });
    const attachmentUrl: string = response.data.cdn;
    // Upload avatar content to s3
    await fetch(attachmentUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    // Upload to given url
    return {
      key: response.data.key,
      url: attachmentUrl,
      cdn: response.data.cdn,
    } as PresignedUrl;
  }

  uploadPassengerAttachedDocViaPresignedURL = async (file: File) => {
    // Get pre-sign url by calling api
    const response = await apiProvider.authorizedRequest.get('/passengers/attached-docs/presigned-url', {
      queryParams: {
        fileType: file.type,
        fileName: file.name,
      },
    });
    const attachmentUrl: string = response.data.cdn;
    // Upload passenger attached document content to s3
    await fetch(attachmentUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    // Upload to given url
    return {
      key: response.data.key,
      url: attachmentUrl,
      cdn: response.data.cdn,
    } as PresignedUrl;
  }

  getPresignedUrl = async (file: File, presignedUrlType: PresignedUrlTypes) => {
    const response = await apiProvider.authorizedRequest.get('/presigned-urls', {
      queryParams: {
        fileType: file.type,
        fileName: file.name,
        presignedUrlType,
      },
    });
    return response.data;
  }

  uploadFileViaPresignedURL = async (file: File, presignedUrl: string) => {
    await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    return presignedUrl;
  }
}
