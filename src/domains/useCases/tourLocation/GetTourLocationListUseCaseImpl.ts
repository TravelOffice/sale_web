import { GetTourLocationListUseCase } from '@domain/useCases/tourLocation/interfaces/GetTourLocationListUseCase';
import { tourLocationRepository } from '@adapter/repositories';

export default class GetTourLocationListUseCaseImpl implements GetTourLocationListUseCase {
  invoke = async () => tourLocationRepository.getAll();
}
