import {
  CreateDepartureTourFormData, DepartureTour, TourLocation, TourTemplate,
} from '@domain/entities/tour';

export interface TourPresenter {
  getAllDepartureTours: () => Promise<DepartureTour[]>
  createDepartureTour: (formData: CreateDepartureTourFormData) => Promise<DepartureTour>,
  getAllToursTemplate: () => Promise<TourTemplate[]>,
  getAllToursLocation: () => Promise<TourLocation[]>,
  takeCareTour: (departureTourId: string) => Promise<DepartureTour>,
  assignTourOperator: (departureTourId: string, tourOperatorId: string) => Promise<DepartureTour>,
}
