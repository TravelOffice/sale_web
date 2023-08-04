import { tourRepository } from '@adapter/repositories';
import { Estimation, UpdateEstimationFormData } from '@domain/entities/tour/Estimation';
import { UpdateTourEstimationsUseCase } from '@domain/useCases/interfaces/tour/UpdateTourEstimationsUseCase';

export default class UpdateTourEstimationsUseCaseImpl implements UpdateTourEstimationsUseCase {
  invoke = (
    departureTourId: string,
    estimationId: string,
    formData: UpdateEstimationFormData,
  ): Promise<Estimation> => tourRepository.updateEstimation(
    departureTourId, estimationId, formData,
  );
}
