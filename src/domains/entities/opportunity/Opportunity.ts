import { Task } from 'redux-saga';
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
  readonly id: string,
  readonly leadId: string,
  readonly leadName: string,
  name: string,
  source: OpportunitySource,
  description: string,
  status: OpportunityStatus,
  closedLostReason?: string,
  estimatedRevenue: number,
  estimatedConfirmDate: string,
  actualCloseDate: string,
  readonly createdAt: number,
  updatedAt: number,
  potential: OpportunityPotentialType,
  notes?: Note[],
  task?: Task[],
}

export interface FilterAttributesOpportunity {
  leadId?: string,
  status?: OpportunityStatus,
}

export interface CreateUpdateOpportunityResponse {
  opportunity?: Opportunity,
  errorMsg?: string,
}

export interface FetchOpportunityResponse {
  lead?: Opportunity,
  errorMsg?: string,
}

export const opportunityStatuses = Object.keys(OpportunityStatusEnum) as Array<OpportunityStatus>;
export const opportunitySources = Object.keys(OpportunitySourceEnum) as Array<OpportunitySource>;
export const opportunityPotentials = Object.keys(
  OpportunityPotentialTypeEnum,
) as Array<OpportunityPotentialType>;
