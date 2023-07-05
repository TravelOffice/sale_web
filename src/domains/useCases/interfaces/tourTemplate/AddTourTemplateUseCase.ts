import { TourTemplate } from '@domain/entities/TourTemplate';

export interface AddTourTemplateUseCase {
  invoke: (tourTemplate: TourTemplate) => Promise<TourTemplate>
}
