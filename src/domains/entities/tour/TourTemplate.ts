import TourCategory from '@domain/entities/tour/TourCategory';
import { TourServicePrice } from './TourServicePrice';
import TourType from './TourType';

export interface TourTemplate {
  name: string,
  readonly code: string;
  category: TourCategory,
  type: TourType,
  visitorCount: number,
  startingLocation: string,
  endingLocation: string,
  durationInDays: number,
  durationInNights: number,
  services: TourServicePrice[],
  policiesAndRegulations: {
    inclusionAndExclusion?: string,
    policyConditionsAndExtraFee?: string,
    cancellationTerms?: string
  },
  tourPlan: string,
  readonly createdAt: number,
  readonly updatedAt: number,
  readonly creatorId: string,
  readonly creatorName: string,
}

export type CreateTourTemplateFormData = Pick<TourTemplate,
'name' |
'type' |
'category' |
'visitorCount' |
'startingLocation' |
'endingLocation' |
'durationInDays' |
'durationInNights' |
'services' |
'policiesAndRegulations' |
'tourPlan'
>;

export type UpdateTourTemplateFormData = CreateTourTemplateFormData;
