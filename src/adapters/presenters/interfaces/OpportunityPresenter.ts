import { FilterAttributesOpportunity, Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface OpportunityPresenter {
  getAllOpportunities: (filterAttributes: FilterAttributesOpportunity) => Promise<Opportunity[]>
  getOpportunitiesByLead: (filterAttributes: FilterAttributesOpportunity) => Promise<Opportunity[]>
  deleteOpportunity: (oppId: string) => Promise<void>
  createOpportunity: (opportunity: Opportunity) => Promise<Opportunity>
}
