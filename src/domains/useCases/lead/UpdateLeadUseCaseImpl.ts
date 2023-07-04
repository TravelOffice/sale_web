import { leadRepository } from '@adapter/repositories';
import { UpdateLeadFormData } from '@domain/entities/lead/Lead';
import { UpdateLeadUseCase } from '../interfaces/lead/UpdateLeadUseCase';

export default class UpdateLeadUseCaseImpl implements UpdateLeadUseCase {
  invoke = async (
    leadId: string,
    formData: UpdateLeadFormData,
  ) => leadRepository.updateLead(leadId, formData);
}
