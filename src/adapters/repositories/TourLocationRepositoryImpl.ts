import { TourLocationRepository } from '@adapter/repositories/interfaces/TourLocationRepository';
import { apiProvider } from '@adapter/infrastructures';
import { CreateTourLocationFormData, UpdateTourLocationFormData } from '@domain/entities/tour';

export default class TourLocationRepositoryImpl implements TourLocationRepository {
  getAll = async () => {
    const response = await apiProvider.authorizedRequest.get('/tour-locations');
    return response.data;
  }

  getOne = async (id: string) => {
    const response = await apiProvider.authorizedRequest.get(`/tour-locations/${id}`);
    return response.data;
  }

  create = async (formData: CreateTourLocationFormData) => {
    const response = await apiProvider.authorizedRequest.post('/tour-locations', formData);
    return response.data;
  }

  delete = async (id: string) => {
    await apiProvider.authorizedRequest.delete(`/tour-locations/${id}`);
  }

  update = async (id: string, formData: UpdateTourLocationFormData) => {
    const response = await apiProvider.authorizedRequest.put(`tour-locations/${id}`, formData);
    return response.data;
  }
}
