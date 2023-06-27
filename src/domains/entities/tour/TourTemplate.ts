import TourCategory from '@domain/entities/tour/TourCategory';
import { TourServicePrice } from './TourServicePrice';
import TourType from './TourType';

export interface TourTemplate {
  name: string,
  code: string,
  category: TourCategory,
  type: TourType,
  visitorCount: number,
  startingLocation: string,
  endingLocation: string,
  durationInDays: number,
  durationInNights: number,
  adultPrice: number,
  childUnder5Price?: number,
  child5to7Price?: number,
  child8to11Price?: number,
  otherPrice?: TourServicePrice[],
  policiesAndRegulations: {
    inclusionAndExclusion?: string,
    policyConditionsAndExtraFee?: string,
    cancellationTerms?: string
  },
  tourPlan: string,
}
