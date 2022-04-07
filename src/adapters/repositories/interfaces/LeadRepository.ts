import { Lead } from '@domain/entities/Lead';

export interface LeadRepository {
  getAllLeads: () => Promise<Lead[]>;
}
