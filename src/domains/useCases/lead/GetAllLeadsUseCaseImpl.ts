import { leadRepository } from '@adapter/repositories';
import { Lead, LeadStatus } from '@domain/entities/lead/Lead';
import { GetAllLeadsUseCase } from '../interfaces/lead/GetAllLeadsUseCase';

export default class GetAllLeadsUseCaseImpl implements GetAllLeadsUseCase {
  invoke = async (status?: LeadStatus): Promise<Lead[]> => leadRepository.getAllLeads(status);
}
