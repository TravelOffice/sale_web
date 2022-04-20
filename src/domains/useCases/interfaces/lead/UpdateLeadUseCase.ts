import { Lead } from '@domain/entities/Lead';

export interface UpdateLeadUseCase {
  invoke: (lead: Lead) => Promise<Lead>
}
