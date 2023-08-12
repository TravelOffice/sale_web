import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';

export interface ChangeOperationStatusUseCase {
  invoke(tourId: string, status: TourOperationStatus): Promise<void>,
}
