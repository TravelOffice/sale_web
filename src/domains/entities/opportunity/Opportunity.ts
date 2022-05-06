import { Task } from 'redux-saga';
import { Lead } from '../Lead';
import { Note } from '../note/Note';

export enum OpportunityStatusEnum {
  INITIALIZED = 'INITIALIZED',
  ADVISORY = 'ADVISORY',
  PRICE_QUOTE = 'PRICE_QUOTE',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
}

export enum OpportunitySourceEnum {
  MARKETING = 'MARKETING',
  CUSTOMER_REFERRALS = 'CUSTOMER_REFERRALS',
  PROACTIVE_CUSTOMERS = 'PROACTIVE_CUSTOMERS',
  SALESMAN = 'SALESMAN',
  OTHERS = 'OTHERS',
}

export enum OpportunityPotentialTypeEnum {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export type OpportunityStatus = keyof typeof OpportunityStatusEnum;
export type OpportunitySource = keyof typeof OpportunitySourceEnum;
export type OpportunityPotentialType = keyof typeof OpportunityPotentialTypeEnum;

export interface Opportunity {
  customer: Lead,
  name: string,
  source: OpportunitySource,
  description: string,
  status: OpportunityStatus,
  closedLostReason: string,
  estimatedRevenue: number,
  estimatedConfirmDate: Date,
  actualCloseDate: Date,
  createdDate: Date,
  updatedDate: Date,
  potential: OpportunityPotentialType,
  owner?: string, // TODO: Owner is sale person. Integrate sale management in the near future
  notes?: Note[],
  task?: Task[],
}

export interface CreateUpdateOpportunityResponse {
  opportunity?: Opportunity,
  errorMsg?: string,
}

export interface FetchOpportunityResponse {
  lead?: Opportunity,
  errorMsg?: string,
}
