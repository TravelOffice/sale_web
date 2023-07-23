import { CancelLeadFormData } from '@domain/entities/lead/CancelLeadFormData';

export interface CancelLeadUseCase {
  invoke: (leadId: string, formData: CancelLeadFormData) => Promise<void>,
}
