import { apiProvider } from '@adapter/infrastructures';
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
    const data = await fetch(attachmentUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    console.log(`Uploaded attachment to S3 with data ${data}`);
    return attachmentUrl.split('?')[0];
  }
}
