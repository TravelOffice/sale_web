import { ChatPlatform } from './ChatPlatform';

export interface Page {
  id: string,
  name: string,
  avatar?: string,
  platform: ChatPlatform,
}
