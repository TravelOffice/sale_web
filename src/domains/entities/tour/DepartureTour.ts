import TourStatus from '@domain/entities/tour/TourStatus';
import { TourTemplate } from './TourTemplate';

export interface DepartureTour extends TourTemplate {
  tourTemplate: string,
  tourTemplateCode: string,
  startDate: number,
  status: TourStatus,
  isOpen: boolean
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
