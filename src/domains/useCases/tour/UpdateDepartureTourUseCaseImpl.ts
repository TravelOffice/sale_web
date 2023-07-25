import { tourRepository } from '@adapter/repositories';
import { UpdateDepartureTourFormData, DepartureTour } from '@domain/entities/tour';
import { UpdateDepartureTourUseCase } from '../interfaces/tour/UpdateDepartureTourUseCase';

export default class UpdateDepartureTourUseCaseImpl implements UpdateDepartureTourUseCase {
  invoke = async (
    tourId: string,
    formData: UpdateDepartureTourFormData,
  ): Promise<DepartureTour> => tourRepository.updateDepartureTour(tourId, formData);
}
