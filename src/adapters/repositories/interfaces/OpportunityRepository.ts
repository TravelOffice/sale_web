import { FilterAttributesOpportunity, Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface OpportunityRepository {
  // Automatically get assigned opps of current user from backend
  getAllOpportunities(filterAttributes: FilterAttributesOpportunity): Promise<Opportunity[]>
  // Get related opps of lead that employee taking care
  getOpportunitiesByLead(filterAttributes: FilterAttributesOpportunity): Promise<Opportunity[]>
  // Delete opportunity with given id
  deleteOpportunity(oppId: string): Promise<void>
  createOpportunity: (opportunity: Opportunity) => Promise<Opportunity>
}
