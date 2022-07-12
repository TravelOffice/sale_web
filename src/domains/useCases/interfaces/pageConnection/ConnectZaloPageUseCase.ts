import { ZaloPageProfile } from '@domain/entities/chat/zalo/ZaloPageProfile';

export interface ConnectZaloPageUseCase {
  invoke: (pageId: string, state: string, authorizationCode: string) => Promise<ZaloPageProfile>
}
