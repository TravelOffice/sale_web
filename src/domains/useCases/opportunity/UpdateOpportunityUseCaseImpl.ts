import { opportunityRepository } from '@adapter/repositories';
import { Opportunity } from '@domain/entities/opportunity/Opportunity';
import { UpdateOpportunityUseCase } from '../interfaces/opportunity/UpdateOpportunityUseCase';

export default class UpdateOpportunityUseCaseImpl implements UpdateOpportunityUseCase {
  invoke = async (
    opportunity: Opportunity,
  ): Promise<Opportunity> => opportunityRepository.updateOpportunity(opportunity);
}
