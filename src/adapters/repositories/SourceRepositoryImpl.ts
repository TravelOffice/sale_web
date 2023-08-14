import { SourceRepository } from '@adapter/repositories/interfaces/SourceRepository';
import { apiProvider } from '@adapter/infrastructures';
import { CreateSourceFormData, UpdateSourceFormData } from '@domain/entities/source/Source';

export default class SourceRepositoryImpl implements SourceRepository {
  getAll = async () => {
    const response = await apiProvider.authorizedRequest.get('/sources');
    return response.data;
  }

  getOne = async (id: string) => {
    const response = await apiProvider.authorizedRequest.get(`/sources/${id}`);
    return response.data;
  }

  create = async (formData: CreateSourceFormData) => {
    const response = await apiProvider.authorizedRequest.post('/sources', formData);
    return response.data;
  }

  delete = async (id: string) => {
    await apiProvider.authorizedRequest.delete(`/sources/${id}`);
  }

  update = async (id: string, formData: UpdateSourceFormData) => {
    const response = await apiProvider.authorizedRequest.put(`sources/${id}`, formData);
    return response.data;
  }
}
