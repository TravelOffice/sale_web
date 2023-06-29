import { apiProvider } from '@adapter/infrastructures';
import { Lead, LeadStatus } from '@domain/entities/Lead';
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

  addLead = async (lead: Lead) => {
    await apiProvider.authorizedRequest.post('/leads', lead);
    return lead;
  }

  updateLead = async (lead: Lead) => {
    await apiProvider.authorizedRequest.put('/leads', lead);
    return lead;
  }
}
