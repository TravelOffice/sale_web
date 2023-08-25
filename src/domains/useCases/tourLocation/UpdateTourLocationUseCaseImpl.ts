import { UpdateTourLocationFormData } from '@domain/entities/tour/TourLocation';
import { tourLocationRepository } from '@adapter/repositories';
import { UpdateTourLocationUseCase } from '@domain/useCases/tourLocation/interfaces/UpdateTourLocationUseCase';

export default class UpdateTourLocationUseCaseImpl implements UpdateTourLocationUseCase {
  invoke = async (
    id: string,
    formData: UpdateTourLocationFormData,
  ) => tourLocationRepository.update(id, formData);
}
