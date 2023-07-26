import { apiProvider } from '@adapter/infrastructures';
import { CreateTourTemplateFormData, UpdateDepartureTourFormData } from '@domain/entities/tour';
import { Booking } from '@domain/entities/booking/Booking';
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
}
