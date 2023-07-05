import { Lead } from '@domain/entities/lead/Lead';

export interface GetMyLeadsUseCase {
  invoke: () => Promise<Lead[]>
}
