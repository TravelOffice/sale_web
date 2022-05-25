import { FilterAttributesOpportunity, Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface GetAllOpportunitiesUseCase {
  invoke: (filterAttributes: FilterAttributesOpportunity) => Promise<Opportunity[]>
}
