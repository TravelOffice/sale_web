import { Lead } from '@domain/entities/Lead';

export interface GetLeadUseCase {
  invoke: (leadId: string) => Promise<Lead>
}
