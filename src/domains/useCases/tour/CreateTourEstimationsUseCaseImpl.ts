import { tourRepository } from '@adapter/repositories';
import { CreateEstimationFormData, Estimation } from '@domain/entities/tour/Estimation';
import { CreateTourEstimationsUseCase } from '@domain/useCases/interfaces/tour/CreateTourEstimationsUseCase';

export default class CreateTourEstimationsUseCaseImpl implements CreateTourEstimationsUseCase {
  invoke = (
    departureTourId: string,
    formData: CreateEstimationFormData,
  ): Promise<Estimation> => tourRepository.createEstimation(departureTourId, formData);
}
