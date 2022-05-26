import { opportunityRepository } from '@adapter/repositories';
import { FilterAttributesOpportunity, Opportunity } from '@domain/entities/opportunity/Opportunity';
import { GetOpportunitiesByLeadUseCase } from '../interfaces/opportunity/GetOpportunitiesByLeadUseCase';

export default class GetOpportunitiesByLeadUseCaseImpl implements GetOpportunitiesByLeadUseCase {
  invoke = async (
    filterAttributes: FilterAttributesOpportunity,
  ): Promise<Opportunity[]> => opportunityRepository.getOpportunitiesByLead(filterAttributes);
}
