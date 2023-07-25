import TourStatus from '@domain/entities/tour/TourStatus';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { TourTemplate } from './TourTemplate';

export interface DepartureTour extends TourTemplate {
  tourTemplate: string,
  tourTemplateCode: string,
  startDate: number,
  status: TourStatus,
  assigneeId?: string,
  assigneeName?: string,
  isOpen: boolean,
  operationStatus: TourOperationStatus,
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
'tourPlan' |
'status' |
'isOpen'
>;
