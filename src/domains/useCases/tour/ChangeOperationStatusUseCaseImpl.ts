import { ChangeOperationStatusUseCase } from '@domain/useCases/tour/interfaces/ChangeOperationStatusUseCase';
import { tourRepository } from '@adapter/repositories';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';

export default class ChangeOperationStatusUseCaseImpl implements ChangeOperationStatusUseCase {
  invoke = async (tourId: string, status: TourOperationStatus) => {
    await tourRepository.changeOperationStatus(tourId, status);
  }
}
