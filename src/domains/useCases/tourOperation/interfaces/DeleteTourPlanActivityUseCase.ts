import { DailyKey, TourPlan } from '@domain/entities/tour/TourPlan';

export interface DeleteTourPlanActivityUseCase {
  invoke: (
    tourId: string,
    currentTourPlan: TourPlan,
    day: DailyKey,
    activityId: string,
  ) => Promise<TourPlan>,
}
