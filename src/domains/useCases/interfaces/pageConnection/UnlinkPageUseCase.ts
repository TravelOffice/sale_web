import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';

export interface UnlinkPageUseCase {
  invoke: (platform: ChatPlatform, pageId: string) => Promise<void>
}
