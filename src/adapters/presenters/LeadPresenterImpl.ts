import { CreateLeadFormData, LeadStatus, UpdateLeadFormData } from '@domain/entities/lead/Lead';
import {
  addLeadUseCase,
  getAllLeadsUseCase,
  getLeadsByCustomerUseCase,
  getLeadUseCase,
  getMyLeadUseCase,
  updateLeadUseCase,
} from '@domain/useCases/lead';
import { LeadPresenter } from './interfaces/LeadPresenter';

export default class LeadPresenterImpl implements LeadPresenter {
  getLeadsByCustomer = async (customerId: string) => getLeadsByCustomerUseCase.invoke(customerId);

  getAllLeads = async (status?: LeadStatus) => getAllLeadsUseCase.invoke(status);

  getMyLeads = async () => getMyLeadUseCase.invoke();

  getLead = async (leadId: string) => getLeadUseCase.invoke(leadId);

  addLead = async (payload: CreateLeadFormData) => addLeadUseCase.invoke(payload);

  updateLead = async (
    leadId: string,
    formData: UpdateLeadFormData,
  ) => updateLeadUseCase.invoke(leadId, formData);
}
