import { DeleteTourPlanActivityUseCase } from '@domain/useCases/tourOperation/interfaces/DeleteTourPlanActivityUseCase';
import { DailyKey, TourPlan, UpdateTourPlanFormData } from '@domain/entities/tour/TourPlan';
import { tourOperationRepository } from '@adapter/repositories';

export default class DeleteTourPlanActivityUseCaseImpl implements DeleteTourPlanActivityUseCase {
  invoke = async (
    tourId: string,
    currentTourPlan: TourPlan,
    day: DailyKey,
    activityId: string,
  ) => {
    const items = currentTourPlan[day];
    if (!items) return currentTourPlan;
    const updateTourPlanFormData: UpdateTourPlanFormData = {
      ...currentTourPlan,
      [day]: items.filter((item) => item.id !== activityId),
    };
    return tourOperationRepository.updateTourPlan(tourId, updateTourPlanFormData);
  }
}
