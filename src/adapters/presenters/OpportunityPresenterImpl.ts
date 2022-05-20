import {
  getAllOpportunitiesUseCase,
  getOpportunitiesByLeadUseCase,
  deleteOpportunityUseCase,
  createOpportunityUseCase,
} from '@domain/useCases';
import { Opportunity } from '@domain/entities/opportunity/Opportunity';
import { OpportunityPresenter } from './interfaces/OpportunityPresenter';

export default class OpportunityPresenterImpl implements OpportunityPresenter {
  getAllOpportunities = async () => getAllOpportunitiesUseCase.invoke();

  getOpportunitiesByLead = async (
    leadPhoneAsId: string,
  ) => getOpportunitiesByLeadUseCase.invoke(leadPhoneAsId);

  deleteOpportunity = async (oppId: string) => deleteOpportunityUseCase.invoke(oppId);

  createOpportunity = async (
    opportunity: Opportunity,
  ) => createOpportunityUseCase.invoke(opportunity);
}
