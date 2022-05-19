import { Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface OpportunityPresenter {
  getAllOpportunities: () => Promise<Opportunity[]>
  getOpportunitiesByLead: (leadPhoneAsId: string) => Promise<Opportunity[]>
  deleteOpportunity: (oppId: string) => Promise<void>
}
