import { tourRepository } from '@adapter/repositories';
import { DepartureTour } from '@domain/entities/tour';
import { CreateDepartureTourUseCase } from '../interfaces/tour/CreateDepartureTourUseCase';

export default class CreateDepartureTourUseCaseImpl implements CreateDepartureTourUseCase {
  invoke = async (
    departureTour: DepartureTour,
  ): Promise<DepartureTour> => tourRepository.createDepartureTour(departureTour);
}
