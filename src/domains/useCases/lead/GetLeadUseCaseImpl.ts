import { leadRepository } from '@adapter/repositories';
import { Lead } from '@domain/entities/lead/Lead';
import { GetLeadUseCase } from '../interfaces/lead/GetLeadUseCase';

export default class GetLeadUseCaseImpl implements GetLeadUseCase {
  invoke = async (leadId: string): Promise<Lead> => leadRepository.getLead(leadId);
}
