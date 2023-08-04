import { tourRepository } from '@adapter/repositories';
import { DeleteTourEstimationsUseCase } from '@domain/useCases/interfaces/tour/DeleteTourEstimationsUseCase';

export default class DeleteTourEstimationsUseCaseImpl implements DeleteTourEstimationsUseCase {
  invoke = (
    departureTourId: string,
    estimationId: string,
  ): Promise<void> => tourRepository.deleteEstimation(departureTourId, estimationId);
}
