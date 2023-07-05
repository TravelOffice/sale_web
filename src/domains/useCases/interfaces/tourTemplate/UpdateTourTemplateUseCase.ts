import { TourTemplate } from '@domain/entities/TourTemplate';

export interface UpdateTourTemplateUseCase {
  invoke: (tourTemplate: TourTemplate) => Promise<TourTemplate>
}
