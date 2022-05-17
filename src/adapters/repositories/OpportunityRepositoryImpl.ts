import { apiProvider } from '@adapter/infrastructures';
import { OpportunityRepository } from './interfaces/OpportunityRepository';

export default class OpportunityRepositoryImpl implements OpportunityRepository {
  getAllOpportunities = async () => {
    const result = await apiProvider.authorizedRequest.get('/opportunities');
    return result.data;
  };

  getOpportunitiesByLead = async (leadPhoneAsId: string) => {
    const result = await apiProvider.authorizedRequest.get(`/leads/${leadPhoneAsId}/opportunities`);
    return result.data;
  }
}
