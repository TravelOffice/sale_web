import { ZaloPage } from '@domain/entities/ZaloPage';

export interface ConnectZaloPageUseCase {
  invoke: (pageId: string, state: string, authorizationCode: string) => Promise<ZaloPage>
}
