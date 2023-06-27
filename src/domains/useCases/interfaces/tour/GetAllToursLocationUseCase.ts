import { TourLocation } from '@domain/entities/tour/TourLocation';

export interface GetAllToursLocationUseCase {
  invoke: () => Promise<TourLocation[]>
}
