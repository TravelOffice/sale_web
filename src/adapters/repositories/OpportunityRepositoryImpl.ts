import { apiProvider } from '@adapter/infrastructures';
import { FilterAttributesOpportunity, Opportunity } from '@domain/entities/opportunity/Opportunity';
import { OpportunityRepository } from './interfaces/OpportunityRepository';

export default class OpportunityRepositoryImpl implements OpportunityRepository {
  getAllOpportunities = async (filterAttributes: FilterAttributesOpportunity) => {
    const result = await apiProvider.authorizedRequest.get('/opportunities', {
      queryParams: {
        status: filterAttributes.status,
      },
    });
    return result.data;
  }

  getOpportunitiesByLead = async (filterAttributes: FilterAttributesOpportunity) => {
    const result = await apiProvider.authorizedRequest.get(`/leads/${filterAttributes.leadId}/opportunities`, {
      queryParams: {
        status: filterAttributes.status,
      },
    });
    return result.data;
  }

  deleteOpportunity = async (oppId: string) => {
    await apiProvider.authorizedRequest.delete(`/opportunities/${oppId}`);
  }

  createOpportunity = async (opportunity: Opportunity) => {
    const result = await apiProvider.authorizedRequest.post(`/leads/${opportunity.leadId}/opportunities`, opportunity);
    return result.data;
  }

  updateOpportunity = async (opportunity: Opportunity) => {
    const result = await apiProvider.authorizedRequest.put(`/leads/${opportunity.leadId}/opportunities/${opportunity.id}`, opportunity);
    return result.data;
  }
}
