import { leadRepository } from '@adapter/repositories';
import { Lead } from '@domain/entities/Lead';
import { GetAllLeadsUseCase } from '../interfaces/lead/GetAllLeadsUseCase';

export default class GetAllLeadsUseCaseImpl implements GetAllLeadsUseCase {
  invoke = async () : Promise<Lead[]> => leadRepository.getAllLeads();
}
