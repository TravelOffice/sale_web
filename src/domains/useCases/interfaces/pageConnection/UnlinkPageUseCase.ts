import { ChatPlatform } from '@domain/entities/ChatPlatform';

export interface UnlinkPageUseCase {
  invoke: (platform: ChatPlatform, pageId: string) => Promise<void>
}
