import { Lead, UpdateLeadFormData } from '@domain/entities/lead/Lead';

export interface UpdateLeadUseCase {
  invoke: (leadId: string, formData: UpdateLeadFormData) => Promise<Lead>
}
