import { Lead } from '@domain/entities/Lead';

export interface LeadPresenter {
  getAllLeads: () => Promise<Lead[]>
}
