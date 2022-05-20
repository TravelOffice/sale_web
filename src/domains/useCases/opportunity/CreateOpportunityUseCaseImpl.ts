import { CreateOpportunityUseCase } from '@domain/useCases/interfaces/opportunity/CreateOpportunityUseCase';
import { Opportunity } from '@domain/entities/opportunity/Opportunity';
import { opportunityRepository } from '@adapter/repositories';

export default class CreateOpportunityUseCaseImpl implements CreateOpportunityUseCase {
  invoke = async (
    opportunity: Opportunity,
  ) : Promise<Opportunity> => opportunityRepository.createOpportunity(opportunity)
}
