import { sourceRepository } from '@adapter/repositories';
import { UpdateSourceFormData } from '@domain/entities/source/Source';
import { UpdateSourceUseCase } from '../interfaces/source/UpdateSourceUseCase';

export default class UpdateSourceUseCaseImpl implements UpdateSourceUseCase {
  invoke = async (
    id: string,
    formData: UpdateSourceFormData,
  ) => sourceRepository.update(id, formData);
}
