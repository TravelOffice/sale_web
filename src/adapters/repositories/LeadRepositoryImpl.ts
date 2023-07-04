import { apiProvider } from '@adapter/infrastructures';
import { CreateLeadFormData, Lead, LeadStatus } from '@domain/entities/lead/Lead';
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

  getLead = async (leadId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/leads/${leadId}`);
    return response.data;
  }

  addLead = async (formData: CreateLeadFormData) => {
    const response = await apiProvider.authorizedRequest.post('/leads', formData);
    return response.data;
  }

  updateLead = async (lead: Lead) => {
    await apiProvider.authorizedRequest.put('/leads', lead);
    return lead;
  }
}
