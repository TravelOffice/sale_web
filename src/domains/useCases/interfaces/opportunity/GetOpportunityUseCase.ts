import { Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface GetOpportunityUseCase {
  invoke: (leadId: string, opportunityId: string) => Promise<Opportunity>
}
