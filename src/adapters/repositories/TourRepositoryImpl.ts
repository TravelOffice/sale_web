import { apiProvider } from '@adapter/infrastructures';
import { CreateTourTemplateFormData, UpdateDepartureTourFormData } from '@domain/entities/tour';
import { Booking } from '@domain/entities/booking/Booking';
import { CreateEstimationFormData, UpdateEstimationFormData } from '@domain/entities/tour/Estimation';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { DepartureTourRepository } from './interfaces/DepartureTourRepository';

export default class TourRepositoryImpl implements DepartureTourRepository {
  getAllToursTemplate = async () => {
    const response = await apiProvider.authorizedRequest.get('/tour-templates');
    return response.data;
  }

  getAllToursLocation = async () => {
    const response = await apiProvider.authorizedRequest.get('/tour-locations');
    return response.data;
  }

  createDepartureTour = async (formData: CreateTourTemplateFormData) => {
    const response = await apiProvider.authorizedRequest.post('/departure-tours', formData);
    return response.data;
  }

  updateDepartureTour = async (tourId: string, formData: UpdateDepartureTourFormData) => {
    const response = await apiProvider.authorizedRequest.put(`/departure-tours/${tourId}`, formData);
    return response.data;
  }

  getDepartureTour = async (tourId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/departure-tours/${tourId}`);
    return response.data;
  }

  getAllDepartureTours = async () => {
    const response = await apiProvider.authorizedRequest.get('/departure-tours');
    return response.data;
  }

  takeCareTour = async (departureTourId: string) => {
    const response = await apiProvider.authorizedRequest.put('/me/take-care-tour', { departureTourId });
    return response.data;
  }

  assignTourOperator = async (departureTourId: string, assigneeId: string) => {
    const response = await apiProvider.authorizedRequest.put(`/departure-tours/${departureTourId}/assignee`, { assigneeId });
    return response.data;
  }

  /**
   * Get bookings list by departure tour
   * @param departureTourId Departure Tour ID
   */
  getBookingsByDepartureTour = async (departureTourId: string): Promise<Booking[]> => {
    const response = await apiProvider.authorizedRequest.get(`/departure-tours/${departureTourId}/bookings`);
    return response.data;
  };

  getEstimations = async (tourId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/tours/${tourId}/estimations`);
    return response.data;
  }

  createEstimation = async (tourId: string, formData: CreateEstimationFormData) => {
    const response = await apiProvider.authorizedRequest.post(`/tours/${tourId}/estimations`, formData);
    return response.data;
  }

  updateEstimation = async (
    tourId: string, estimationId: string, formData: UpdateEstimationFormData,
  ) => {
    const response = await apiProvider.authorizedRequest.put(`/tours/${tourId}/estimations/${estimationId}`, formData);
    return response.data;
  }

  deleteEstimation = async (tourId: string, estimationId: string) => {
    const response = await apiProvider.authorizedRequest.delete(`/tours/${tourId}/estimations/${estimationId}`);
    return response.data;
  }

  getPaymentVouchersByTour = async (departureToudId: string): Promise<PaymentVoucher[]> => {
    const response = await apiProvider.authorizedRequest.get(`/tours/${departureToudId}/payment-vouchers`);
    return response.data;
  }

  changeOperationStatus = async (tourId: string, status: TourOperationStatus) => {
    const response = await apiProvider.authorizedRequest.put(`/departure-tours/${tourId}/operation-status`, { operationStatus: status });
    return response.data;
  }
}
