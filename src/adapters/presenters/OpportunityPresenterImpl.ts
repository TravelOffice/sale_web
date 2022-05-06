import { getAllOpportunitiesUseCase } from '@domain/useCases';
import { OpportunityPresenter } from './interfaces/OpportunityPresenter';

export default class OpportunityPresenterImpl implements OpportunityPresenter {
    getAllOpportunities = async () => getAllOpportunitiesUseCase.invoke();
}
