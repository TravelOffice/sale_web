export type ZaloMessageType = 'text' | 'voice' | 'photo' | 'gif' | 'link' | 'links' | 'sticker' | 'location' | 'nosupport';

export interface ZaloMessage {
  src: number,
  time: number,
  type: ZaloMessageType,
  message_id: string,
  message: string,
  url?: string,
  from_id: string,
  to_id: string,
  from_display_name: string,
  from_avatar: string,
  to_display_name: string,
  to_avatar: string,
  location: string,
}
