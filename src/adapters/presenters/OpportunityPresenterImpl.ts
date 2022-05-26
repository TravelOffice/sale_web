import {
  getAllOpportunitiesUseCase,
  getOpportunitiesByLeadUseCase,
  deleteOpportunityUseCase,
  createOpportunityUseCase,
} from '@domain/useCases';
import { FilterAttributesOpportunity, Opportunity } from '@domain/entities/opportunity/Opportunity';
import { OpportunityPresenter } from './interfaces/OpportunityPresenter';

export default class OpportunityPresenterImpl implements OpportunityPresenter {
  getAllOpportunities = async (
    filterAttributes: FilterAttributesOpportunity,
  ) => getAllOpportunitiesUseCase.invoke(filterAttributes);

  getOpportunitiesByLead = async (
    filterAttributes: FilterAttributesOpportunity,
  ) => getOpportunitiesByLeadUseCase.invoke(filterAttributes);

  deleteOpportunity = async (oppId: string) => deleteOpportunityUseCase.invoke(oppId);

  createOpportunity = async (
    opportunity: Opportunity,
  ) => createOpportunityUseCase.invoke(opportunity);
}
