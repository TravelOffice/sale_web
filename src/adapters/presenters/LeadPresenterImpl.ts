import { CancelLeadFormData } from '@domain/entities/lead/CancelLeadFormData';
import {
  CreateLeadFormData, LeadStatus, UpdateLeadFormData,
} from '@domain/entities/lead/Lead';
import { getLinkedPostOnMarketplaceInfoUseCase } from '@domain/useCases';
import {
  addLeadUseCase, cancelLeadUseCase,
  getAllLeadsUseCase,
  getLeadUseCase,
  getLeadsByCustomerUseCase,
  getMyLeadUseCase,
  takeLeadUseCase,
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

  takeLead = async (
    leadId: string,
    currentUserId: string,
  ) => takeLeadUseCase.invoke(leadId, currentUserId);

  cancelLead = async (
    leadId: string,
    formData: CancelLeadFormData,
  ) => cancelLeadUseCase.invoke(leadId, formData);

  getLinkedPostOnMarketplaceInfo = async (
    leadId: string,
  ) => getLinkedPostOnMarketplaceInfoUseCase.invoke(leadId);
}
