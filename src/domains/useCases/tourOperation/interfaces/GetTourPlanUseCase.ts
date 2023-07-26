import { TourPlan } from '@domain/entities/tour/TourPlan';

export interface GetTourPlanUseCase {
  invoke: (tourId: string) => Promise<TourPlan>,
}
