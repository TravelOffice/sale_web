import { apiProvider } from '@adapter/infrastructures';
import {
  CreateLeadFormData, LeadStatus, UpdateLeadFormData,
} from '@domain/entities/lead/Lead';
import { CancelLeadFormData } from '@domain/entities/lead/CancelLeadFormData';
import { LeadRepository } from './interfaces/LeadRepository';

export default class LeadRepositoryImpl implements LeadRepository {
  getAllLeads = async (status?: LeadStatus) => {
    const response = await apiProvider.authorizedRequest.get('/leads', {
      queryParams: {
        status,
      },
    });
    return response.data;
  }

  getMyLeads = async () => {
    const response = await apiProvider.authorizedRequest.get('/me/leads');
    return response.data;
  }

  getLead = async (leadId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/leads/${leadId}`);
    return response.data;
  }

  addLead = async (formData: CreateLeadFormData) => {
    const response = await apiProvider.authorizedRequest.post('/leads', formData);
    return response.data;
  }

  updateLead = async (leadId: string, formData: UpdateLeadFormData) => {
    const response = await apiProvider.authorizedRequest.put(`/leads/${leadId}`, formData);
    return response.data;
  }

  getLeadsByCustomer = async (customerId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/customers/${customerId}/leads`);
    return response.data;
  }

  takeLead = async (leadId: string, currentUserId: string) => {
    const response = await apiProvider.authorizedRequest.put(`/leads/${leadId}/assignee`, {
      assignee: currentUserId,
    });
    return response.data;
  }

  cancelLead = async (leadId: string, formData: CancelLeadFormData) => {
    await apiProvider.authorizedRequest.put(`/leads/${leadId}/cancel`, formData);
  }
}
