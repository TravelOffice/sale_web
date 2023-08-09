import TourStatus from '@domain/entities/tour/TourStatus';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { TourPlan } from '@domain/entities/tour/TourPlan';
import { TourTemplate } from './TourTemplate';

export interface DepartureTour extends TourTemplate {
  tourTemplate: string,
  tourTemplateCode: string,
  startDate: string,
  status: TourStatus,
  assigneeId?: string,
  assigneeName?: string,
  isOpen: boolean,
  operationStatus: TourOperationStatus,
  tourPlan?: TourPlan,
}

export interface ExtendedDepartureTour extends DepartureTour {
  startingLocationName: string,
  endingLocationName: string,
}

export type CreateDepartureTourFormData = Pick<DepartureTour,
'tourTemplate' |
'tourTemplateCode' |
'name' |
'startDate' |
'type' |
'category' |
'visitorCount' |
'startingLocation' |
'endingLocation' |
'durationInDays' |
'durationInNights' |
'services' |
'policiesAndRegulations' |
'status' |
'isOpen' |
'operationStatus'
>;

export type UpdateDepartureTourFormData = CreateDepartureTourFormData;
