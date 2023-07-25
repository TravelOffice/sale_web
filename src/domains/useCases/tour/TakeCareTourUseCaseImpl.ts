import { tourRepository } from '@adapter/repositories';
import { DepartureTour } from '@domain/entities/tour';
import { TakeCareTourUseCase } from '../interfaces/tour/TakeCareTourUseCase';

export default class TakeCareTourUseCaseImpl implements TakeCareTourUseCase {
  invoke = async (
    departureTourId: string,
  ): Promise<DepartureTour> => tourRepository.takeCareTour(departureTourId);
}
