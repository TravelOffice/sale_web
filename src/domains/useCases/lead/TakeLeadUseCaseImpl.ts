import { TakeLeadUseCase } from '@domain/useCases/interfaces/lead/TakeLeadUseCase';
import { leadRepository } from '@adapter/repositories';

export default class TakeLeadUseCaseImpl implements TakeLeadUseCase {
  invoke = async (
    leadId: string,
    currentUserId: string,
  ) => leadRepository.takeLead(leadId, currentUserId);
}
