import { sourceRepository } from '@adapter/repositories';
import { DeleteSourceUseCase } from '../interfaces/source/DeleteSourceUseCase';

export default class DeleteSourceUseCaseImpl implements DeleteSourceUseCase {
  invoke = async (id: string) => sourceRepository.delete(id)
}
