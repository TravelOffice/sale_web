import { FetchResult, Observable } from '@apollo/client';

export interface SubscribeNewNotificationUseCase {
  invoke: () => Observable<FetchResult>
}
