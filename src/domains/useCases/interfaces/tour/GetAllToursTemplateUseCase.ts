import { TourTemplate } from '@domain/entities/tour/TourTemplate';

export interface GetAllToursTemplateUseCase {
  invoke: () => Promise<TourTemplate[]>
}
