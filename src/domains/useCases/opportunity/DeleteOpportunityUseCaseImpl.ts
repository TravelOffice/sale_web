import { opportunityRepository } from '@adapter/repositories';
import { DeleteOpportunityUseCase } from '../interfaces/opportunity/DeleteOpportunityUseCase';

export default class DeleteOpportunityUseCaseImpl implements DeleteOpportunityUseCase {
  invoke = async (oppId: string) : Promise<void> => opportunityRepository.deleteOpportunity(oppId);
}
