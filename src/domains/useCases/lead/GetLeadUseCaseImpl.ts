import { leadRepository } from '@adapter/repositories';
import { GetLeadUseCase } from '../interfaces/lead/GetLeadUseCase';

export default class GetLeadUseCaseImpl implements GetLeadUseCase {
  invoke = async (leadId: string) => leadRepository.getLead(leadId);
}
