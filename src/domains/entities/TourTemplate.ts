export interface ServicePrice {
  name: string;
  price: number;
}
export enum TourType {
  INBOUND = 'INBOUND',
  INLAND = 'INLAND',
  OUTBOUND = 'OUTBOUND',
}

export interface TourTemplate {
  readonly code: string;
  name: string;
  type: TourType;
  visitorCount: number;
  startingLocation: string;
  endingLocation: string;
  durationInDays: number;
  durationInNights: number;
  adultPrice: number;
  childUnder5Price?: number;
  child5to7Price?: number;
  child8to11Price?: number;
  otherPrice?: ServicePrice[];
  policiesAndRegulations: {
    inclusionAndExclusion?: string;
    policyConditionsAndExtraFee?: string;
    cancellationTerms?: string;
  };
  tourPlan: string;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly creator: string;
}
