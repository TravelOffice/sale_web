import { tourTemplateRepository } from '@adapter/repositories';
import { UpdateTourTemplateUseCase } from '@domain/useCases/interfaces/tourTemplate/UpdateTourTemplateUseCase';
import { TourTemplate } from '@domain/entities/TourTemplate';

export default class UpdateTourTemplateUseCaseImpl implements UpdateTourTemplateUseCase {
  invoke = async (
    tourTemplate: TourTemplate,
  ) : Promise<TourTemplate> => tourTemplateRepository.updateTourTemplate(tourTemplate);
}
