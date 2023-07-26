import { TourPlan, UpdateTourPlanFormData } from '@domain/entities/tour/TourPlan';

export interface TourOperationRepository {
  getTourPlan: (tourId: string) => Promise<TourPlan>,
  updateTourPlan: (tourId: string, tourPlan: UpdateTourPlanFormData) => Promise<TourPlan>,
}
