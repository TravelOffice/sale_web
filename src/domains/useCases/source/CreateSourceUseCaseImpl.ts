import { sourceRepository } from '@adapter/repositories';
import { CreateSourceFormData } from '@domain/entities/source/Source';
import { CreateSourceUseCase } from '../interfaces/source/CreateSourceUseCase';

export default class CreateSourceUseCaseImpl implements CreateSourceUseCase {
  invoke = async (formData: CreateSourceFormData) => sourceRepository.create(formData)
}
