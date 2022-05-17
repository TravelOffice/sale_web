import { getAllOpportunitiesUseCase, getOpportunitiesByLeadUseCase, deleteOpportunityUseCase } from '@domain/useCases';
import { OpportunityPresenter } from './interfaces/OpportunityPresenter';

export default class OpportunityPresenterImpl implements OpportunityPresenter {
  getAllOpportunities = async () => getAllOpportunitiesUseCase.invoke();

  getOpportunitiesByLead = async (
    leadPhoneAsId: string,
  ) => getOpportunitiesByLeadUseCase.invoke(leadPhoneAsId);

  deleteOpportunity = async (oppId: string) => deleteOpportunityUseCase.invoke(oppId);
}
