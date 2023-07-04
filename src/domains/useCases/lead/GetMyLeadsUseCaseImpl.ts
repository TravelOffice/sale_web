import { GetMyLeadsUseCase } from '@domain/useCases/interfaces/lead/GetMyLeadsUseCase';
import { leadRepository } from '@adapter/repositories';

export default class GetMyLeadsUseCaseImpl implements GetMyLeadsUseCase {
  invoke = async () => leadRepository.getMyLeads();
}
