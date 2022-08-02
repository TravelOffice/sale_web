import { AvatarPhoto } from './message-contents/FileBasedModels';

export interface TelegramUserInfo {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  avatar?: AvatarPhoto;
}
