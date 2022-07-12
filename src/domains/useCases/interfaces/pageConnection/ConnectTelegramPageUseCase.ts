import { TelegramPageProfile } from '@domain/entities/chat/telegram/TelegramPageProfile';

export interface ConnectTelegramPageUseCase {
  invoke: (botToken: string) => Promise<TelegramPageProfile>
}
