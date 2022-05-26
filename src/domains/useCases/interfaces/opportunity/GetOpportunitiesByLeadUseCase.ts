import { FilterAttributesOpportunity, Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface GetOpportunitiesByLeadUseCase {
  invoke: (filterAttributes: FilterAttributesOpportunity) => Promise<Opportunity[]>
}
