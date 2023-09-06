import { CancelLeadFormData } from '@domain/entities/lead/CancelLeadFormData';
import {
  CreateLeadFormData,
  Lead,
  LeadStatus,
  UpdateLeadFormData,
} from '@domain/entities/lead/Lead';
import { LinkedLeadOrTourInfo } from '@domain/entities/marketplace/LinkedLeadOrTourInfo';

export interface LeadPresenter {
  addLead: (formData: CreateLeadFormData) => Promise<Lead>;
  getLead: (leadId: string) => Promise<Lead>;
  updateLead: (leadId: string, formData: UpdateLeadFormData) => Promise<Lead>;
  getAllLeads: (status?: LeadStatus) => Promise<Lead[]>;
  getMyLeads: () => Promise<Lead[]>;
  getLeadsByCustomer: (customerId: string) => Promise<Lead[]>,
  takeLead: (leadId: string, currentUserId: string) => Promise<void>,
  cancelLead: (leadId: string, formData: CancelLeadFormData) => Promise<void>,
  getLinkedPostOnMarketplaceInfo: (leadId: string) => Promise<LinkedLeadOrTourInfo>,
}
