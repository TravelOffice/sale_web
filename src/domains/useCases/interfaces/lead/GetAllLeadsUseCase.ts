import { Lead } from '@domain/entities/Lead';

export interface GetAllLeadsUseCase {
  invoke: () => Promise<Lead[]>
}
