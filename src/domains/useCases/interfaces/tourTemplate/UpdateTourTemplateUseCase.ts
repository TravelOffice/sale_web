import { TourTemplate, UpdateTourTemplateFormData } from '@domain/entities/tour/TourTemplate';

export interface UpdateTourTemplateUseCase {
  invoke: (
    tourTemplateId: string,
    tourTemplate: UpdateTourTemplateFormData,
  ) => Promise<TourTemplate>
}
