import { Estimation } from '@domain/entities/tour/Estimation';

export const tourPlanActivityTypes = [
  'MEAL',
  'PARTY',
  'LOCAL_MOVE',
  'FLIGHT_MOVE',
  'LEISURE',
  'KAYAKING',
  'ADVENTURE',
  'DIVING',
  'TREKKING',
  'CHECKIN',
  'CHECKOUT',
  'OTHER',
];

export type TourPlanActivityType = typeof tourPlanActivityTypes[number];

export interface DailyTourPlanItem {
  id: string,
  startTime: number,
  endTime: number,
  activityType: TourPlanActivityType,
  description: string,
  estimationId: string[],
  estimations: Estimation[]
}

export type DailyKey = `DAY_${number}`;
export interface TourPlan {
  [key: DailyKey]: DailyTourPlanItem[]
}

export type UpdateTourPlanFormData = TourPlan;

export type CreateTourPlanActivityFormData = DailyTourPlanItem & {
  day: DailyKey,
};

export type UpdateTourPlanActivityFormData = CreateTourPlanActivityFormData;
