import { CreateLeadFormData, Lead } from '@domain/entities/lead/Lead';

export interface AddLeadUseCase {
  invoke: (formData: CreateLeadFormData) => Promise<Lead>
}
