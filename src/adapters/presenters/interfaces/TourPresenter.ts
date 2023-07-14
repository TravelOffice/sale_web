import { DepartureTour, TourLocation, TourTemplate } from '@domain/entities/tour';

export interface TourPresenter {
  getAllDepartureTours: () => Promise<DepartureTour[]>
  createDepartureTour: (departureTour: DepartureTour) => Promise<DepartureTour>,
  getAllToursTemplate: () => Promise<TourTemplate[]>,
  getAllToursLocation: () => Promise<TourLocation[]>,
}
