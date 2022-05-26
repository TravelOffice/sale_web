import { apiProvider } from '@adapter/infrastructures';
import { Lead, LeadEnum, LeadStatusType } from '@domain/entities/Lead';
import { LeadRepository } from './interfaces/LeadRepository';

export default class LeadRepositoryImpl implements LeadRepository {
  getAllLeads = async (status?: LeadStatusType) => {
    const response = await apiProvider.authorizedRequest.get('/leads', {
      queryParams: {
        type: LeadEnum.LEAD,
        status,
      },
    });
    return response.data;
  }

  getLead = async (leadId: string) => {
    const lead = await apiProvider.authorizedRequest.get(`/leads/${leadId}`);
    return lead;
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
