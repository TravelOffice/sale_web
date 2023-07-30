import { GetTourEstimationsUseCase } from '@domain/useCases/interfaces/tour/GetTourEstimationsUseCase';
import { tourRepository } from '@adapter/repositories';
import { Estimation } from '@domain/entities/tour/Estimation';

export default class GetTourEstimationsUseCaseImpl implements GetTourEstimationsUseCase {
  invoke = (
    departureTourId: string,
  ): Promise<Estimation[]> => tourRepository.getEstimations(departureTourId);
}
