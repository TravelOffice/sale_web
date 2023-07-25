import { DepartureTour } from '@domain/entities/tour/DepartureTour';
import { tourRepository } from '@adapter/repositories';
import { GetDepartureTourUseCase } from '../interfaces/tour/GetDepartureTourUseCase';

export default class GetDepartureTourUseCaseImpl implements GetDepartureTourUseCase {
  invoke = async (
    departureTourId: string,
  ): Promise<DepartureTour> => tourRepository.getDepartureTour(departureTourId);
}
