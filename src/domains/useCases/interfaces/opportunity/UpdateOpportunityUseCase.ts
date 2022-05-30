import { Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface UpdateOpportunityUseCase {
  invoke: (opportunity: Opportunity) => Promise<Opportunity>;
}
