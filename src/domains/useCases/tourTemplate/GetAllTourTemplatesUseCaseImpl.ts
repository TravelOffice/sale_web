import { tourTemplateRepository } from '@adapter/repositories';
import { TourTemplate } from '@domain/entities/TourTemplate';
import { GetAllTourTemplatesUseCase } from '../interfaces/tourTemplate/GetAllTourTemplatesUseCase';

export default class GetAllTourTemplatesUseCaseImpl implements GetAllTourTemplatesUseCase {
  invoke = async (): Promise<TourTemplate[]> => tourTemplateRepository.getAllTourTemplates();
}
