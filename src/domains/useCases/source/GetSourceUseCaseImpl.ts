import { sourceRepository } from '@adapter/repositories';
import { GetSourceUseCase } from '../interfaces/source/GetSourceUseCase';

export default class GetSourceUseCaseImpl implements GetSourceUseCase {
  invoke = async (id: string) => sourceRepository.getOne(id);
}
