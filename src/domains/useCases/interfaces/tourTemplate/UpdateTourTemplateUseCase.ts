import { TourTemplate } from '@domain/entities/TourTemplate';

export interface UpdateTourTemplateUseCase {
  invoke: (tourTemplateId: string, tourTemplate: TourTemplate) => Promise<TourTemplate>
}
