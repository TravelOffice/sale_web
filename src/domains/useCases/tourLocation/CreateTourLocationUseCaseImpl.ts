import { CreateTourLocationUseCase } from '@domain/useCases/tourLocation/interfaces/CreateTourLocationUseCase';
import { tourLocationRepository } from '@adapter/repositories';
import { CreateTourLocationFormData } from '@domain/entities/tour';

export default class CreateTourLocationUseCaseImpl implements CreateTourLocationUseCase {
  invoke = async (formData: CreateTourLocationFormData) => tourLocationRepository.create(formData);
}
