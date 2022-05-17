import { Lead, LeadStatusType } from '@domain/entities/Lead';

export interface GetAllLeadsUseCase {
  invoke: (status?: LeadStatusType) => Promise<Lead[]>
}
