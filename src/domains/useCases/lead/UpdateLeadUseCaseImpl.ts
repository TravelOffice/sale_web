import { leadRepository } from '@adapter/repositories';
import { Lead } from '@domain/entities/lead/Lead';
import { UpdateLeadUseCase } from '../interfaces/lead/UpdateLeadUseCase';

export default class UpdateLeadUseCaseImpl implements UpdateLeadUseCase {
  invoke = async (lead: Lead) => leadRepository.updateLead(lead);
}
