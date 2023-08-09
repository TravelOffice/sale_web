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
import { CreateTourPlanActivityFormData, DailyKey, TourPlan } from '@domain/entities/tour/TourPlan';

export interface TourPresenter {
  getAllDepartureTours: () => Promise<DepartureTour[]>,

  getDepartureTour: (tourId: string) => Promise<DepartureTour>,

  createDepartureTour: (formData: CreateDepartureTourFormData) => Promise<DepartureTour>,

  updateDepartureTour: (
    tourId: string, formData: UpdateDepartureTourFormData) => Promise<DepartureTour>,

  getAllToursTemplate: () => Promise<TourTemplate[]>,

  getAllToursLocation: () => Promise<TourLocation[]>,

  takeCareTour: (departureTourId: string) => Promise<DepartureTour>,

  assignTourOperator: (departureTourId: string, tourOperatorId: string) => Promise<DepartureTour>,

  getEstimations: (departureTourId: string) => Promise<Estimation[]>,

  createEstimation: (tourId: string, formData: CreateEstimationFormData) => Promise<Estimation>,

  updateEstimation: (
    tourId: string, estimationId: string, formData: UpdateEstimationFormData,
  ) => Promise<Estimation>,
  deleteEstimation: (tourId: string, estimationId: string) => Promise<void>,

  getBookingsByDepartureTour(departureTourId: string): Promise<Booking[]>,

  getPaymentVouchersByTour(departureTourId: string): Promise<PaymentVoucher[]>,

  addTourPlanActivity: (
    tourId: string,
    currentTourPlan: TourPlan,
    formData: CreateTourPlanActivityFormData,
  ) => Promise<TourPlan>,

  getTourPlan: (tourId: string) => Promise<TourPlan>,

  updateTourPlanActivity: (
    tourId: string,
    currentTourPlan: TourPlan,
    formData: CreateTourPlanActivityFormData,
  ) => Promise<TourPlan>,

  deleteTourPlanActivity: (
    tourId: string,
    currentTourPlan: TourPlan,
    day: DailyKey,
    activityId: string,
  ) => Promise<TourPlan>,
}
