import {
  CreateLeadFormData, Lead, LeadStatus, UpdateLeadFormData,
} from '@domain/entities/lead/Lead';

export interface LeadRepository {
  addLead(formData: CreateLeadFormData): Promise<Lead>;
  updateLead(leadId: string, formData: UpdateLeadFormData): Promise<Lead>;
  getLead(leadId: string): Promise<Lead>;
  getAllLeads(status?: LeadStatus): Promise<Lead[]>;
  getMyLeads(): Promise<Lead[]>;
}
