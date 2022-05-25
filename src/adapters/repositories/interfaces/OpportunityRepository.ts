import { FilterAttributesOpportunity, Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface OpportunityRepository {
  // Automatically get assigned opps of current user from backend
  getAllOpportunities(filterAttributes: FilterAttributesOpportunity): Promise<Opportunity[]>
  // Get related opps of lead that employee taking care
  getOpportunitiesByLead(filterAttributes: FilterAttributesOpportunity): Promise<Opportunity[]>
  // Delete opportunity with given id
  deleteOpportunity(oppId: string): Promise<void>
  // Create a new opportunity
  createOpportunity: (opportunity: Opportunity) => Promise<Opportunity>
  // Update opportunity with given id
  updateOpportunity: (opportunity: Opportunity) => Promise<Opportunity>
  // Get opp by id
  getOpportunity: (leadId: string, opportunityId: string,) => Promise<Opportunity>
}
