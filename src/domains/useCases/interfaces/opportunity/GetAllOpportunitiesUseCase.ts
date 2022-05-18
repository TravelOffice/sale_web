import { Opportunity } from '@domain/entities/opportunity/Opportunity';

export interface GetAllOpportunitiesUseCase {
  invoke: () => Promise<Opportunity[]>
}
