import { ZaloPage } from '@domain/entities/chat/zalo/ZaloPage';

export interface ConnectZaloPageUseCase {
  invoke: (pageId: string, state: string, authorizationCode: string) => Promise<ZaloPage>
}
