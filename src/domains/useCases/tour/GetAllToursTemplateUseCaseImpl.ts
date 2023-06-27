import { tourRepository } from '@adapter/repositories';
import { TourTemplate } from '@domain/entities/tour/TourTemplate';
import { GetAllToursTemplateUseCase } from '../interfaces/tour/GetAllToursTemplateUseCase';

export default class GetAllToursTemplateUseCaseImpl implements GetAllToursTemplateUseCase {
  invoke = async (): Promise<TourTemplate[]> => tourRepository.getAllToursTemplate();
}
