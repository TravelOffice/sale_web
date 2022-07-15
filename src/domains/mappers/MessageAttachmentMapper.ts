import { FacebookMessageAttachment } from '@domain/entities/chat/facebook/FacebookMessage';
import { MessageAttachment } from '@domain/entities/chat/Message';

class MessageAttachmentMapper {
  getUrl = (attachment?: FacebookMessageAttachment): string | undefined => {
    if (!attachment) {
      return undefined;
    }
    return attachment.file_url || attachment.image_data?.url || attachment.video_data?.url;
  }

  getMediaWidth = (attachment?: FacebookMessageAttachment): number | undefined => {
    if (!attachment) {
      return undefined;
    }
    return attachment.image_data?.width || attachment.video_data?.width;
  }

  getMediaHeight = (attachment?: FacebookMessageAttachment): number | undefined => {
    if (!attachment) {
      return undefined;
    }
    return attachment.image_data?.height || attachment.video_data?.height;
  }

  fromFacebook = (fbMessageAttachment: FacebookMessageAttachment): MessageAttachment => {
    const url = this.getUrl(fbMessageAttachment);
    const width = this.getMediaWidth(fbMessageAttachment);
    const height = this.getMediaHeight(fbMessageAttachment);
    return {
      name: fbMessageAttachment.name,
      url,
      previewUrl: fbMessageAttachment.image_data?.preview_url,
      mimeType: fbMessageAttachment.mime_type,
      fileSize: fbMessageAttachment.size,
      width,
      height,
    };
  }
}

const messageAttachmentMapper = new MessageAttachmentMapper();
export default messageAttachmentMapper;
