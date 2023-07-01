import { Lead, LeadStatus } from '@domain/entities/lead/Lead';

export interface GetAllLeadsUseCase {
  invoke: (status?: LeadStatus) => Promise<Lead[]>
}
