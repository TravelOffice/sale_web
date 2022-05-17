import { leadRepository } from '@adapter/repositories';
import { Lead, LeadStatusType } from '@domain/entities/Lead';
import { GetAllLeadsUseCase } from '../interfaces/lead/GetAllLeadsUseCase';

export default class GetAllLeadsUseCaseImpl implements GetAllLeadsUseCase {
  invoke = async (status?: LeadStatusType): Promise<Lead[]> => leadRepository.getAllLeads(status);
}
