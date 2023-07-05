import { apiProvider } from '@adapter/infrastructures';
import { TourTemplateRepository } from '@adapter/repositories/interfaces/TourTemplateRepository';
import { TourTemplate } from '@domain/entities/TourTemplate';

export default class TourTemplateRepositoryImpl implements TourTemplateRepository {
  getAllTourTemplates = async () => {
    const response = await apiProvider.authorizedRequest.get('/tour-templates');
    return response.data;
  }

  getTourTemplate = async (tourTemplateId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/tour-templates/${tourTemplateId}`);
    return response.data;
  }

  addTourTemplate = async (tourTemplate: TourTemplate) => {
    const response = await apiProvider.authorizedRequest.post('/tour-templates', tourTemplate);
    return response.data;
  }

  updateTourTemplate = async (tourTemplate: TourTemplate) => {
    const response = await apiProvider.authorizedRequest.put('/tour-templates', tourTemplate);
    return response.data;
  }
}
