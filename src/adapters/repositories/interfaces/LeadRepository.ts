import { CreateLeadFormData, Lead, LeadStatus } from '@domain/entities/lead/Lead';

export interface LeadRepository {
  addLead(lead: CreateLeadFormData): Promise<Lead>;
  updateLead(lead: Lead): Promise<Lead>;
  getLead(leadId: string): Promise<Lead>;
  getAllLeads(status?: LeadStatus): Promise<Lead[]>;
}
