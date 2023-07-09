import {
  CreateLeadFormData, Lead, LeadStatus, UpdateLeadFormData,
} from '@domain/entities/lead/Lead';

export interface LeadPresenter {
  addLead: (formData: CreateLeadFormData) => Promise<Lead>;
  getLead: (leadId: string) => Promise<Lead>;
  updateLead: (leadId: string, formData: UpdateLeadFormData) => Promise<Lead>;
  getAllLeads: (status?: LeadStatus) => Promise<Lead[]>;
  getMyLeads: () => Promise<Lead[]>;
  getLeadsByCustomer: (customerId: string) => Promise<Lead[]>
}
