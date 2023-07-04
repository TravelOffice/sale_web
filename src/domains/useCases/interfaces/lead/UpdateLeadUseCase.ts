import { Lead } from '@domain/entities/lead/Lead';

export interface UpdateLeadUseCase {
  invoke: (lead: Lead) => Promise<Lead>
}
