import { apiProvider } from '@adapter/infrastructures';
import { Lead, LeadEnum } from '@domain/entities/Lead';
import { LeadRepository } from './interfaces/LeadRepository';

export default class LeadRepositoryImpl implements LeadRepository {
  getAllLeads = async () => {
    const response = await apiProvider.authorizedRequest.get('/leads', {
      queryParams: {
        type: LeadEnum.LEAD,
      },
    });
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
