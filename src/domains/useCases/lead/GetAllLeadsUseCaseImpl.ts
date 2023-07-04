import { leadRepository } from '@adapter/repositories';
import { LeadStatus } from '@domain/entities/lead/Lead';
import { GetAllLeadsUseCase } from '../interfaces/lead/GetAllLeadsUseCase';

export default class GetAllLeadsUseCaseImpl implements GetAllLeadsUseCase {
  invoke = async (status?: LeadStatus) => leadRepository.getAllLeads(status);
}
