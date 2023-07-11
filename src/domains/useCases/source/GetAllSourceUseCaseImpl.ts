import { sourceRepository } from '@adapter/repositories';
import { GetAllSourceUseCase } from '../interfaces/GetAllSourceUseCase';

export default class GetAllSourceUseCaseImpl implements GetAllSourceUseCase {
  invoke = async () => sourceRepository.getAll();
}
