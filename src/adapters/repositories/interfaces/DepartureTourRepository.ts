import {
  CreateDepartureTourFormData,
  DepartureTour,
  TourLocation,
  TourTemplate,
  UpdateDepartureTourFormData,
} from '@domain/entities/tour';
import { CreateEstimationFormData, Estimation, UpdateEstimationFormData } from '@domain/entities/tour/Estimation';
import { Booking } from '@domain/entities/booking/Booking';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export interface DepartureTourRepository {
  getAllDepartureTours: () => Promise<DepartureTour[]>,
  getAllToursTemplate: () => Promise<TourTemplate[]>,
  getAllToursLocation: () => Promise<TourLocation[]>,
  takeCareTour: (departureTourId: string) => Promise<DepartureTour>,
  assignTourOperator: (departureTourId: string, assigneeId: string) => Promise<DepartureTour>,

  createDepartureTour(formData: CreateDepartureTourFormData): Promise<DepartureTour>,

  updateDepartureTour(
    tourId: string, formData: UpdateDepartureTourFormData
  ): Promise<DepartureTour>,

  getDepartureTour(tourId: string): Promise<DepartureTour>,

  getBookingsByDepartureTour(departureTourId: string): Promise<Booking[]>,

  getEstimations(tourId: string): Promise<Estimation[]>,

  createEstimation(tourId: string, formData: CreateEstimationFormData): Promise<Estimation>,

  updateEstimation(
    tourId: string, estimationId: string, formData: UpdateEstimationFormData,
  ): Promise<Estimation>,

  deleteEstimation(tourId: string, estimationId: string): Promise<void>,

  getPaymentVouchersByTour(departureTourId: string): Promise<PaymentVoucher[]>,
}
