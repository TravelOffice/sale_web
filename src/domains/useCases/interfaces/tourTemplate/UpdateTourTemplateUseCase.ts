import { TourTemplate } from '@domain/entities/tour/TourTemplate';

export interface UpdateTourTemplateUseCase {
  invoke: (tourTemplateId: string, tourTemplate: TourTemplate) => Promise<TourTemplate>
}
