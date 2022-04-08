import { Lead } from '@domain/entities/Lead';

export interface AddLeadUseCase {
  invoke: (lead: Lead) => Promise<Lead>
}
