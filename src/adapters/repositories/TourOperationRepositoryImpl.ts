import { TourOperationRepository } from '@adapter/repositories/interfaces/TourOperationRepository';
import { apiProvider } from '@adapter/infrastructures';
import {
  DailyKey, DailyTourPlanItem, TourPlan, UpdateTourPlanFormData,
} from '@domain/entities/tour/TourPlan';
import * as uuid from 'uuid';

export default class TourOperationRepositoryImpl implements TourOperationRepository {
  getTourPlan = async (tourId: string) => {
    const { data } = await apiProvider.authorizedRequest.get(`/tours/${tourId}/operation/plan`);
    const tourPlan = data.tourPlan as TourPlan;
    const entries = Object.entries(tourPlan) as [DailyKey, DailyTourPlanItem[]][];
    const tourPlansWithId: TourPlan = {};
    entries.forEach(([key, value]) => {
      tourPlansWithId[key] = value.map((item) => ({
        ...item,
        id: item.id || uuid.v4(),
      }));
    });
    return tourPlansWithId;
  };

  updateTourPlan = async (
    tourId: string,
    tourPlan: UpdateTourPlanFormData,
  ) => {
    const { data } = await apiProvider.authorizedRequest.put(`/tours/${tourId}/operation/plan`, { tourPlan });
    return data.tourPlan as TourPlan;
  };
}
