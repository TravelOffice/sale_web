import { CreateTourPlanActivityFormData, TourPlan, UpdateTourPlanFormData } from '@domain/entities/tour/TourPlan';
import { tourOperationRepository } from '@adapter/repositories';
import { UpdateTourPlanActivityUseCase } from '@domain/useCases/tourOperation/interfaces/UpdateTourPlanActivityUseCase';

export default class UpdateTourPlanActivityUseCaseImpl implements UpdateTourPlanActivityUseCase {
  invoke = async (
    tourId: string,
    currentTourPlan: TourPlan,
    formData: CreateTourPlanActivityFormData,
  ) => {
    const {
      day, activityType, description, endTime, estimationId, startTime,
    } = formData;
    const items = currentTourPlan[day];
    const activity = items.find((item) => item.id === formData.id);
    if (!activity) {
      throw new Error('Activity not found');
    }
    activity.activityType = activityType;
    activity.description = description;
    activity.endTime = endTime;
    activity.estimationId = estimationId;
    activity.startTime = startTime;
    const updateTourPlanFormData: UpdateTourPlanFormData = {
      ...currentTourPlan,
      [day]: items,
    };
    return tourOperationRepository.updateTourPlan(tourId, updateTourPlanFormData);
  }
}
