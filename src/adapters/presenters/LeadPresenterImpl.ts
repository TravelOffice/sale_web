import { getAllLeadsUseCase } from '@domain/useCases';
import { LeadPresenter } from './interfaces/LeadPresenter';

export default class LeadPresenterImpl implements LeadPresenter {
    getAllLeads = async () => getAllLeadsUseCase.invoke();
}
