import { sourceRepository } from '@adapter/repositories';
import { UpdateSourceFormData } from '@domain/entities/source/Source';
import { UpdateSourceUseCase } from '../interfaces/UpdateSourceUseCase';

export default class UpdateSourceUseCaseImpl implements UpdateSourceUseCase {
  invoke = async (formData: UpdateSourceFormData) => sourceRepository.update(formData);
}
