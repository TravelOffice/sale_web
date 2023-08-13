import { AddTourPlanActivityUseCase } from '@domain/useCases/tourOperation/interfaces/AddTourPlanActivityUseCase';
import {
  CreateTourPlanActivityFormData,
  DailyTourPlanItem,
  TourPlan,
  UpdateTourPlanFormData,
} from '@domain/entities/tour/TourPlan';
import { tourOperationRepository } from '@adapter/repositories';
import * as uuid from 'uuid';

export default class AddTourPlanActivityUseCaseImpl implements AddTourPlanActivityUseCase {
  invoke = async (
    tourId: string,
    currentTourPlan: TourPlan,
    formData: CreateTourPlanActivityFormData,
  ) => {
    const {
      day, activityType, description, endTime, estimationId, startTime,
    } = formData;
    const items: Partial<DailyTourPlanItem>[] = currentTourPlan[day] || [];
    items.push({
      id: uuid.v4(),
      activityType,
      description,
      endTime,
      estimationId,
      startTime,
    });
    const updateTourPlanFormData: UpdateTourPlanFormData = {
      ...currentTourPlan,
      [day]: items,
    };
    return tourOperationRepository.updateTourPlan(tourId, updateTourPlanFormData);
  }
}
