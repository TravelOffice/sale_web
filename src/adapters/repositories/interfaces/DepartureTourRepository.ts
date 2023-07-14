import {
  CreateTourTemplateFormData,
  DepartureTour,
  TourLocation,
  TourTemplate,
} from '@domain/entities/tour';

export interface DepartureTourRepository {
  getAllDepartureTours: () => Promise<DepartureTour[]>,
  getAllToursTemplate: () => Promise<TourTemplate[]>,
  getAllToursLocation: () => Promise<TourLocation[]>,
  createDepartureTour: (departureTour: CreateTourTemplateFormData) => Promise<DepartureTour>,
}
