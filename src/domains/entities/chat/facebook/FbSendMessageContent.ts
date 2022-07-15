/* eslint-disable max-len */
import AttachmentMessageType from '../AttachmentMessageType';

export interface BasedFacebookSendMessageContent {
  metadata?: string, // Custom string that is delivered as a message echo. 1000 character limit.
  quick_replies?: Array<any>, // https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies
}

export type FacebookSendTextMessageContent = BasedFacebookSendMessageContent & {
  text: string // Text content to send to user
};

// Refer to https://developers.facebook.com/docs/messenger-platform/reference/send-api/#attachment
export type FacebookSendAttachmentMessageContent = BasedFacebookSendMessageContent & {
  attachment: {
    type: AttachmentMessageType,
    payload: {
      url: string,
      is_reusable: boolean, // Set to true to make the saved asset sendable to other message recipients. Defaults to false.
    },
  }
};

export type FacebookSendMessageContent = FacebookSendTextMessageContent | FacebookSendAttachmentMessageContent;
