import { tourRepository } from '@adapter/repositories';
import { CreateDepartureTourFormData, DepartureTour } from '@domain/entities/tour';
import { CreateDepartureTourUseCase } from '../interfaces/tour/CreateDepartureTourUseCase';

export default class CreateDepartureTourUseCaseImpl implements CreateDepartureTourUseCase {
  invoke = async (
    formData: CreateDepartureTourFormData,
  ): Promise<DepartureTour> => tourRepository.createDepartureTour(formData);
}
