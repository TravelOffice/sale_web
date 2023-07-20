import { apiProvider } from '@adapter/infrastructures';
import { CreateTourTemplateFormData } from '@domain/entities/tour';
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

  getAllDepartureTours = async () => {
    const response = await apiProvider.authorizedRequest.get('/departure-tours');
    return response.data;
  }
}
