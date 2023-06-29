import { Lead, LeadStatus } from '@domain/entities/Lead';

export interface GetAllLeadsUseCase {
  invoke: (status?: LeadStatus) => Promise<Lead[]>
}
