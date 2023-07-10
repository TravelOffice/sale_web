import { sourceRepository } from '@adapter/repositories';
import { GetAllSourcesUseCase } from '@domain/useCases/interfaces/source/GetAllSourcesUseCase';

export default class GetAllSourcesUseCaseImpl implements GetAllSourcesUseCase {
  invoke = async () => sourceRepository.getAll();
}
