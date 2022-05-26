import { opportunityRepository } from '@adapter/repositories';
import { FilterAttributesOpportunity, Opportunity } from '@domain/entities/opportunity/Opportunity';
import { GetAllOpportunitiesUseCase } from '../interfaces/opportunity/GetAllOpportunitiesUseCase';

export default class GetAllOpportunitiesUseCaseImpl implements GetAllOpportunitiesUseCase {
  invoke = async (
    filterAttributes: FilterAttributesOpportunity,
  ): Promise<Opportunity[]> => opportunityRepository.getAllOpportunities(filterAttributes);
}
