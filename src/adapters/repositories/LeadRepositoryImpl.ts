import { apiProvider } from '@adapter/infrastructures';
import { Lead } from '@domain/entities/Lead';
import { ResponseType } from '@utils/ApiUtils';
import { LeadRepository } from './interfaces/LeadRepository';

export default class LeadRepositoryImpl implements LeadRepository {
  getAllLeads = async () => {
    const response = await apiProvider.authorizedRequest.get('/leads');
    if (response.message !== ResponseType.SUCCESS) {
      throw Error('Get Assigned Lead error');
    }
    return response.data;
  }

  addLead = async (lead: Lead) => {
    const response = await apiProvider.authorizedRequest.post('/leads', lead);
    if (response.message !== ResponseType.SUCCESS) {
      throw Error('Create Lead error');
    }
    return lead;
  }

  updateLead = async (lead: Lead) => {
    const response = await apiProvider.authorizedRequest.put('/leads', lead);
    if (response.message !== ResponseType.SUCCESS) {
      throw Error('Update Lead error');
    }
    return lead;
  }
}
