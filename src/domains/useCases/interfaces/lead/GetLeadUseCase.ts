import { Lead } from '@domain/entities/lead/Lead';

export interface GetLeadUseCase {
  invoke: (leadId: string) => Promise<Lead>
}
