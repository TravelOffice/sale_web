import { Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface OpportunityPresenter {
  getAllOpportunities: () => Promise<Opportunity[]>
}
