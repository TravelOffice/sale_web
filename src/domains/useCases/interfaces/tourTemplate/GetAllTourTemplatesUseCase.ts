import { TourTemplate } from '@domain/entities/tour/TourTemplate';

export interface GetAllTourTemplatesUseCase {
  invoke: () => Promise<TourTemplate[]>
}
