import { Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface OpportunityRepository {
  getAllOpportunities(): Promise<Opportunity[]>
}
