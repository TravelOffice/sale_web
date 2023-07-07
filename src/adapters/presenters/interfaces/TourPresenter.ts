import { DepartureTour, TourLocation, TourTemplate } from '@domain/entities/tour';

export interface TourPresenter {
  createDepartureTour: (departureTour: DepartureTour) => Promise<DepartureTour>
  getAllToursTemplate: () => Promise<TourTemplate[]>
  getAllToursLocation: () => Promise<TourLocation[]>
}
