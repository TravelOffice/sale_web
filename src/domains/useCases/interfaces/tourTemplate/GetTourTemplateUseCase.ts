import { TourTemplate } from '@domain/entities/tour/TourTemplate';

export interface GetTourTemplateUseCase {
  invoke: (tourTemplateId: string) => Promise<TourTemplate>
}
