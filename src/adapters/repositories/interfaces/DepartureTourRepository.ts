import {
  CreateDepartureTourFormData,
  DepartureTour,
  TourLocation,
  TourTemplate,
} from '@domain/entities/tour';

export interface DepartureTourRepository {
  getAllDepartureTours: () => Promise<DepartureTour[]>,
  getAllToursTemplate: () => Promise<TourTemplate[]>,
  getAllToursLocation: () => Promise<TourLocation[]>,
  createDepartureTour: (formData: CreateDepartureTourFormData) => Promise<DepartureTour>,
  takeCareTour: (departureTourId: string) => Promise<DepartureTour>,
  assignTourOperator: (departureTourId: string, assigneeId: string) => Promise<DepartureTour>,
}
