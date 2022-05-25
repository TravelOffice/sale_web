import { Opportunity } from '@domain/entities/opportunity/Opportunity';
import { opportunityRepository } from '@adapter/repositories';
import { GetOpportunityUseCase } from '@domain/useCases/interfaces/opportunity/GetOpportunityUseCase';

export default class GetOpportunityUseCaseImpl implements GetOpportunityUseCase {
  invoke = async (
    leadId: string, opportunityId: string,
  ) : Promise<Opportunity> => opportunityRepository.getOpportunity(leadId, opportunityId)
}
