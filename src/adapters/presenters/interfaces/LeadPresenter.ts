import { CreateLeadFormData, Lead, LeadStatus } from '@domain/entities/lead/Lead';

export interface LeadPresenter {
  addLead: (lead: CreateLeadFormData) => Promise<Lead>;
  getLead: (leadId: string) => Promise<Lead>;
  updateLead: (lead: Lead) => Promise<Lead>;
  getAllLeads: (status?: LeadStatus) => Promise<Lead[]>
}
