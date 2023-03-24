import { ChatType } from './TelegramTypes';
import { TelegramUserInfo } from './TelegramUser';
import * as MessageContents from './message-contents';

export interface ChatPhoto {
  small_file_id: string;
  big_file_id: string;
}

export interface ChatPermissions {
  can_send_messages?: boolean;
  can_send_media_messages?: boolean;
  can_send_polls?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
}

export interface TelegramChat {
  id: number;
  type: ChatType;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo?: ChatPhoto;
  description?: string;
  invite_link?: string;
  pinned_message?: TelegramMessage;
  permissions?: ChatPermissions;
  can_set_sticker_set?: boolean;
  sticker_set_name?: string;
  has_private_forwards?: boolean;
  has_protected_content?: boolean;
  slow_mode_delay?: number;
  message_auto_delete_time?: number;
  linked_chat_id?: number;
  /**
   * @deprecated since version Telegram Bot API 4.4 - July 29, 2019
   */
  all_members_are_administrators?: boolean;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUserInfo;
  date: number;
  chat: TelegramChat;
  sender_chat?: TelegramChat;
  forward_from?: TelegramUserInfo;
  forward_from_chat?: TelegramChat;
  forward_from_message_id?: number;
  forward_signature?: string;
  forward_sender_name?: string;
  forward_date?: number;
  reply_to_message?: TelegramMessage;
  edit_date?: number;
  media_group_id?: string;
  author_signature?: string;
  text?: string;
  entities?: MessageContents.MessageEntity[];
  caption_entities?: MessageContents.MessageEntity[];
  audio?: MessageContents.Audio;
  document?: MessageContents.Document;
  animation?: MessageContents.Animation;
  game?: MessageContents.Game;
  photo?: MessageContents.PhotoSize[];
  sticker?: MessageContents.Sticker;
  video?: MessageContents.Video;
  voice?: MessageContents.Voice;
  video_note?: MessageContents.VideoNote;
  caption?: string;
  contact?: MessageContents.Contact;
  location?: MessageContents.Location;
  venue?: MessageContents.Venue;
  poll?: MessageContents.Poll;
  new_chat_members?: TelegramUserInfo[];
  left_chat_member?: TelegramUserInfo;
  new_chat_title?: string;
  new_chat_photo?: MessageContents.PhotoSize[];
  delete_chat_photo?: boolean;
  group_chat_created?: boolean;
  supergroup_chat_created?: boolean;
  channel_chat_created?: boolean;
  migrate_to_chat_id?: number;
  migrate_from_chat_id?: number;
  pinned_message?: TelegramMessage;
  dice?: MessageContents.Dice;
  metadata?: string;
}
