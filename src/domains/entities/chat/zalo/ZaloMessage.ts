export interface ZaloMessage {
  src: number,
  time: number,
  type: string,
  message_id: string,
  message: string,
  from_id: string,
  to_id: string,
  from_display_name: string,
  from_avatar: string,
  to_display_name: string,
  to_avatar: string,
}
