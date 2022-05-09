import { Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface CreateOpportunityUseCase {
  invoke: (opportunity: Opportunity) => Promise<Opportunity>
}
