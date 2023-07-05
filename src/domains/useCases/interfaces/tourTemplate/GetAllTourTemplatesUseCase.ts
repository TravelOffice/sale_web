import { TourTemplate } from '@domain/entities/TourTemplate';

export interface GetAllTourTemplatesUseCase {
  invoke: () => Promise<TourTemplate[]>
}
