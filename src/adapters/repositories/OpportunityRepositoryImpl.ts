import { apiProvider } from '@adapter/infrastructures';
import { Opportunity } from '@domain/entities/opportunity/Opportunity';
import { OpportunityRepository } from './interfaces/OpportunityRepository';

export default class OpportunityRepositoryImpl implements OpportunityRepository {
  getAllOpportunities = async () => {
    const result = await apiProvider.authorizedRequest.get('/opportunities');
    return result.data;
  }

  getOpportunitiesByLead = async (leadPhoneAsId: string) => {
    const result = await apiProvider.authorizedRequest.get(`/leads/${leadPhoneAsId}/opportunities`);
    return result.data;
  }

  deleteOpportunity = async (oppId: string) => {
    await apiProvider.authorizedRequest.delete(`/opportunities/${oppId}`);
  }

  createOpportunity = async (opportunity: Opportunity) => {
    const result = await apiProvider.authorizedRequest.post(`/leads/${opportunity.leadId}/opportunities`, opportunity);
    return result.data;
  }
}
