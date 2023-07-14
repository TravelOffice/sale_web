import { tourTemplateRepository } from '@adapter/repositories';
import { AddTourTemplateUseCase } from '@domain/useCases/interfaces/tourTemplate/AddTourTemplateUseCase';
import { CreateTourTemplateFormData, TourTemplate } from '@domain/entities/tour/TourTemplate';

export default class AddTourTemplateUseCaseImpl implements AddTourTemplateUseCase {
  invoke = async (
    tourTemplate: CreateTourTemplateFormData,
  ): Promise<TourTemplate> => tourTemplateRepository.addTourTemplate(tourTemplate);
}
