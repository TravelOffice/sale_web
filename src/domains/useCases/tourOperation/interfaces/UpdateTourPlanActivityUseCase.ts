import { TourPlan, UpdateTourPlanActivityFormData } from '@domain/entities/tour/TourPlan';

export interface UpdateTourPlanActivityUseCase {
  invoke: (
    tourId: string,
    currentTourPlan: TourPlan,
    formData: UpdateTourPlanActivityFormData,
  ) => Promise<TourPlan>,
}
