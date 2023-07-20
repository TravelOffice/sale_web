import { tourTemplateRepository } from '@adapter/repositories';
import { UpdateTourTemplateUseCase } from '@domain/useCases/interfaces/tourTemplate/UpdateTourTemplateUseCase';
import { TourTemplate, UpdateTourTemplateFormData } from '@domain/entities/tour/TourTemplate';

export default class UpdateTourTemplateUseCaseImpl implements UpdateTourTemplateUseCase {
  invoke = async (
    tourTemplateId: string,
    tourTemplate: UpdateTourTemplateFormData,
  ): Promise<TourTemplate> => tourTemplateRepository.updateTourTemplate(
    tourTemplateId,
    tourTemplate,
  );
}
