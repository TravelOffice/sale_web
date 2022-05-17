import { Lead, LeadStatusType } from '@domain/entities/Lead';

export interface LeadRepository {
  addLead(lead: Lead): Promise<Lead>;
  updateLead(lead: Lead): Promise<Lead>;
  getAllLeads(status?: LeadStatusType): Promise<Lead[]>;
}
