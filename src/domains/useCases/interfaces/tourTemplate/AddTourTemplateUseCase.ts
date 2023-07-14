import { CreateTourTemplateFormData, TourTemplate } from '@domain/entities/tour/TourTemplate';

export interface AddTourTemplateUseCase {
  invoke: (tourTemplate: CreateTourTemplateFormData) => Promise<TourTemplate>
}
