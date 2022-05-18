import { FetchResult } from '@apollo/client';
import { Observable } from 'subscriptions-transport-ws';

export interface SubscribeNewMessageUseCase {
  invoke: () => Observable<FetchResult>
}
