import { Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface OpportunityRepository {
  // Automatically get assigned opps of current user from backend
  getAllOpportunities(): Promise<Opportunity[]>
  // Get related opps of lead that employee taking care
  getOpportunitiesByLead(leadPhoneAsId: string): Promise<Opportunity[]>
  // Delete opportunity with given id
  deleteOpportunity(oppId: string): Promise<void>
}
