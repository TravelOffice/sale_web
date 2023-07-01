import { CreateLeadFormData, Lead, LeadStatus } from '@domain/entities/lead/Lead';
import {
  addLeadUseCase, getAllLeadsUseCase,
  getLeadUseCase, updateLeadUseCase,
} from '@domain/useCases';
import { LeadPresenter } from './interfaces/LeadPresenter';

export default class LeadPresenterImpl implements LeadPresenter {
    getAllLeads = async (status?: LeadStatus) => getAllLeadsUseCase.invoke(status);

    getLead = async (leadId: string) => getLeadUseCase.invoke(leadId);

    addLead = async (payload: CreateLeadFormData) => addLeadUseCase.invoke(payload);

    updateLead = async (payload: Lead) => updateLeadUseCase.invoke(payload);
}
