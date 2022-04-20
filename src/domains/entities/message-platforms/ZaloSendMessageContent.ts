/**
 * Definitions for received text message type
 * - ZaloReceivedTextMessage
 */

export type ZaloSendTextMessage = {
  text: string, // Content of message
};

export type ZaloReplyTextMessage = {
  text: string, // Content of reply message
  quote_message_id: string // ID of message wanted to reply
};

/**
 * Definitions for received text message type
 * - ZaloSendImageMessage
 * - ZaloSendGIFMessage
 * - ZaloSendFileMessage
 */

export type ZaloSendImageMessage = {
  payload: {
    template_type: 'media', // Display image
    elements: [{
      media_type: 'image',
      attachment_id: string // ID returned from upload image api
    }]
  }
  type: 'template'
};

export type ZaloSendGIFMessage = {
  payload: {
    template_type: 'media', // Display image
    elements: [{
      media_type: 'gif',
      attachment_id: string, // ID returned from upload image api
      width: number, // Width of image
      height: number // Heigh of image
    }]
  }
  type: 'template'
};

export type ZaloSendFileMessage = {
  payload: {
    token: string // Token returned form upload file api
  }
  type: 'file'
};

export type ZaloSendAttachment = ZaloSendImageMessage | ZaloSendGIFMessage | ZaloSendFileMessage;
export type ZaloSendAttachmentMessage = {
  text?: string,
  attachments: ZaloSendAttachment
};

export type ZaloSendMessageContent = ZaloSendTextMessage | ZaloReplyTextMessage | ZaloSendAttachmentMessage;
