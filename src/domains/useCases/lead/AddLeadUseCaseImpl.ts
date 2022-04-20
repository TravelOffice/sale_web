import { leadRepository } from '@adapter/repositories';
import { Lead } from '@domain/entities/Lead';
import { AddLeadUseCase } from '../interfaces/lead/AddLeadUseCase';

export default class AddLeadUseCaseImpl implements AddLeadUseCase {
  invoke = async (lead: Lead) : Promise<Lead> => leadRepository.addLead(lead);
}
