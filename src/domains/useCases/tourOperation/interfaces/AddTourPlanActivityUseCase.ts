import { CreateTourPlanActivityFormData, TourPlan } from '@domain/entities/tour/TourPlan';

export interface AddTourPlanActivityUseCase {
  invoke: (
    tourId: string,
    currentTourPlan: TourPlan,
    formData: CreateTourPlanActivityFormData,
  ) => Promise<TourPlan>,
}
