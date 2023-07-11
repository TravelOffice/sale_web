import {
  CreateLeadFormData, Lead, LeadStatus, UpdateLeadFormData,
} from '@domain/entities/lead/Lead';
import { CancelLeadFormData } from '@domain/entities/lead/CancelLeadFormData';

export interface LeadRepository {
  addLead(formData: CreateLeadFormData): Promise<Lead>;

  updateLead(leadId: string, formData: UpdateLeadFormData): Promise<Lead>;

  getLead(leadId: string): Promise<Lead>;

  getAllLeads(status?: LeadStatus): Promise<Lead[]>;

  getMyLeads(): Promise<Lead[]>;

  getLeadsByCustomer(customerId: string): Promise<Lead[]>;

  takeLead(leadId: string, currentUserId: string): Promise<void>;

  cancelLead(leadId: string, formData: CancelLeadFormData): Promise<void>;
}
