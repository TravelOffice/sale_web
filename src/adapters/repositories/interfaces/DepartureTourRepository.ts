import {
  CreateDepartureTourFormData,
  DepartureTour,
  TourLocation,
  TourTemplate,
  UpdateDepartureTourFormData,
} from '@domain/entities/tour';
import { Booking } from '@domain/entities/booking/Booking';

export interface DepartureTourRepository {
  getAllDepartureTours: () => Promise<DepartureTour[]>,
  getAllToursTemplate: () => Promise<TourTemplate[]>,
  getAllToursLocation: () => Promise<TourLocation[]>,
  takeCareTour: (departureTourId: string) => Promise<DepartureTour>,
  assignTourOperator: (departureTourId: string, assigneeId: string) => Promise<DepartureTour>,
  createDepartureTour(formData: CreateDepartureTourFormData): Promise<DepartureTour>
  updateDepartureTour(tourId: string, formData: UpdateDepartureTourFormData): Promise<DepartureTour>
  getDepartureTour(tourId: string): Promise<DepartureTour>,
  getBookingsByDepartureTour(departureTourId: string): Promise<Booking[]>;
}
