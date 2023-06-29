import { Lead, LeadStatus } from '@domain/entities/Lead';

export interface LeadRepository {
  addLead(lead: Lead): Promise<Lead>;
  updateLead(lead: Lead): Promise<Lead>;
  getLead(leadId: string): Promise<Lead>;
  getAllLeads(status?: LeadStatus): Promise<Lead[]>;
}
