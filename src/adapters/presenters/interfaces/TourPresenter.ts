import {
  CreateDepartureTourFormData,
  DepartureTour,
  TourLocation,
  TourTemplate,
  UpdateDepartureTourFormData,
} from '@domain/entities/tour';
import { Booking } from '@domain/entities/booking/Booking';

export interface TourPresenter {
  getAllDepartureTours: () => Promise<DepartureTour[]>
  getDepartureTour: (tourId: string) => Promise<DepartureTour>;
  createDepartureTour: (formData: CreateDepartureTourFormData) => Promise<DepartureTour>,
  updateDepartureTour: (
    tourId: string, formData: UpdateDepartureTourFormData) => Promise<DepartureTour>,
  getAllToursTemplate: () => Promise<TourTemplate[]>,
  getAllToursLocation: () => Promise<TourLocation[]>,
  takeCareTour: (departureTourId: string) => Promise<DepartureTour>,
  assignTourOperator: (departureTourId: string, tourOperatorId: string) => Promise<DepartureTour>,
  getBookingsByDepartureTour(departureTourId: string): Promise<Booking[]>;
}
