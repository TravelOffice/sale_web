import { apiProvider } from '@adapter/infrastructures';
import { DepartureTour } from '@domain/entities/tour';
import { TourRepository } from './interfaces/TourRepository';

export default class TourRepositoryImpl implements TourRepository {
  getAllToursTemplate = async () => {
    const response = await apiProvider.authorizedRequest.get('/tour-templates');
    return response.data;
  }

  getAllToursLocation = async () => {
    const response = await apiProvider.authorizedRequest.get('/tour-locations');
    return response.data;
  }

  createDepartureTour = async (departureTour :DepartureTour) => {
    const response = await apiProvider.authorizedRequest.post('/departure-tours', departureTour);
    return response.data;
  }
}
