import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { Conversation } from '@domain/entities/chat/Conversation';

export interface GetPlatformConversationsUseCase {
  invoke: (platform: ChatPlatform, platformPageId: string) => Promise<Conversation[]>
}
