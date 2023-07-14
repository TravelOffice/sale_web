import { tourRepository } from '@adapter/repositories';
import { DepartureTour } from '@domain/entities/tour';
import { GetAllDepartureToursUseCase } from '../interfaces/tour/GetAllDepartureToursUseCase';

export default class GetAllDepartureToursUseCaseImpl implements GetAllDepartureToursUseCase {
  invoke = async (): Promise<DepartureTour[]> => tourRepository.getAllDepartureTours();
}
