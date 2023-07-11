import { CancelLeadUseCase } from '@domain/useCases/interfaces/lead/CancelLeadUseCase';
import { leadRepository } from '@adapter/repositories';
import { CancelLeadFormData } from '@domain/entities/lead/CancelLeadFormData';

export default class CancelLeadUseCaseImpl implements CancelLeadUseCase {
  invoke = async (
    leadId: string,
    formData: CancelLeadFormData,
  ) => leadRepository.cancelLead(leadId, formData)
}
