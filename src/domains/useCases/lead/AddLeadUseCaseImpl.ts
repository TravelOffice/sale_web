import { leadRepository } from '@adapter/repositories';
import { CreateLeadFormData } from '@domain/entities/lead/Lead';
import { AddLeadUseCase } from '../interfaces/lead/AddLeadUseCase';

export default class AddLeadUseCaseImpl implements AddLeadUseCase {
  invoke = async (formData: CreateLeadFormData) => leadRepository.addLead(formData);
}
