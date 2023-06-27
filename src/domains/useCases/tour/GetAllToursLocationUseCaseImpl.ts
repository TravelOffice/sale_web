import { tourRepository } from '@adapter/repositories';
import { TourLocation } from '@domain/entities/tour/TourLocation';
import { GetAllToursLocationUseCase } from '../interfaces/tour/GetAllToursLocationUseCase';

export default class GetAllToursLocationUseCaseImpl implements GetAllToursLocationUseCase {
  invoke = async (): Promise<TourLocation[]> => tourRepository.getAllToursLocation();
}
