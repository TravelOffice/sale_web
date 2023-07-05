import { TourTemplate } from '@domain/entities/TourTemplate';

export interface GetTourTemplateUseCase {
  invoke: (tourTemplateId: string) => Promise<TourTemplate>
}
