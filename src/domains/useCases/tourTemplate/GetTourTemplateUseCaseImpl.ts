import { tourTemplateRepository } from '@adapter/repositories';
import { GetTourTemplateUseCase } from '@domain/useCases/interfaces/tourTemplate/GetTourTemplateUseCase';
import { TourTemplate } from '@domain/entities/TourTemplate';

export default class GetTourTemplateUseCaseImpl implements GetTourTemplateUseCase {
  invoke = async (
    tourTemplateId: string,
  ): Promise<TourTemplate> => tourTemplateRepository.getTourTemplate(tourTemplateId);
}
