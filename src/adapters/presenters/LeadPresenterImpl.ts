import { Lead } from '@domain/entities/Lead';
import { addLeadUseCase, getAllLeadsUseCase, updateLeadUseCase } from '@domain/useCases';
import { LeadPresenter } from './interfaces/LeadPresenter';

export default class LeadPresenterImpl implements LeadPresenter {
    getAllLeads = async () => getAllLeadsUseCase.invoke();

    addLead = async (payload: Lead) => addLeadUseCase.invoke(payload);

    updateLead = async (payload: Lead) => updateLeadUseCase.invoke(payload);
}
