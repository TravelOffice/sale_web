import { TourLocation } from '@domain/entities/tour/TourLocation';

export interface GetTourLocationListUseCase {
  invoke: () => Promise<TourLocation[]>,
}
