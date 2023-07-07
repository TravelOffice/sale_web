import { DepartureTour, TourLocation, TourTemplate } from '@domain/entities/tour';

export interface TourRepository {
  getAllToursTemplate(): Promise<TourTemplate[]>;
  getAllToursLocation(): Promise<TourLocation[]>;
  createDepartureTour(departureTour: DepartureTour): Promise<DepartureTour>
}
