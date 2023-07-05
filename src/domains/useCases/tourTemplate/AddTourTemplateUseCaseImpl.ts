import { tourTemplateRepository } from '@adapter/repositories';
import { AddTourTemplateUseCase } from '@domain/useCases/interfaces/tourTemplate/AddTourTemplateUseCase';
import { TourTemplate } from '@domain/entities/TourTemplate';

export default class AddTourTemplateUseCaseImpl implements AddTourTemplateUseCase {
  invoke = async (
    tourTemplate: TourTemplate,
  ) : Promise<TourTemplate> => tourTemplateRepository.addTourTemplate(tourTemplate);
}
