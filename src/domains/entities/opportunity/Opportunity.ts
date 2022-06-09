import { ItemInterface } from 'react-sortablejs';
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
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum OppTaskSortEnum {
  TITLE_ASC = 'TITLE_ASC',
  TITLE_DESC = 'TITLE_DESC',
  DUE_DATE = 'DUE_DATE',
}

export enum OppNoteSortEnum {
  TITLE_ASC = 'TITLE_ASC',
  TITLE_DESC = 'TITLE_DESC',
  DUE_DATE = 'DUE_DATE',
}

export type OpportunityStatus = keyof typeof OpportunityStatusEnum;
export type OpportunitySource = keyof typeof OpportunitySourceEnum;
export type OpportunityPotentialType = keyof typeof OpportunityPotentialTypeEnum;

export interface Opportunity {
  readonly id: string,
  readonly leadId: string,
  readonly leadName: string,
  readonly createdAt: number,
  readonly updatedAt: number,
  name: string,
  source: OpportunitySource,
  description?: string,
  status: OpportunityStatus,
  closedLostReason?: string,
  estimatedRevenue: number,
  estimatedConfirmDate: string,
  actualCloseDate?: string,
  potential: OpportunityPotentialType,
  notes?: OpportunityNote[],
  tasks?: OpportunityTask[],
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

export enum PriorityOption {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface OpportunityTaskWithoutId {
  title: string,
  dueDate: string,
  description: string,
  creatorId?: string,
  creatorName?: string,
  priority: PriorityOption,
  isCompleted: boolean,
}

export interface OpportunityNoteWithoutId {
  title: string,
  dueDate: string,
  description: string,
  creatorId?: string,
  creatorName?: string,
  priority: PriorityOption,
  isCompleted: boolean,
}

export type OpportunityTask = OpportunityTaskWithoutId & ItemInterface;

export type OpportunityNote = OpportunityNoteWithoutId & ItemInterface;


export interface SelectOpportunityParams {
  leadId: string,
  oppId: string,
}

export interface OpportunityTaskSearchParams {
  query: string,
  sortBy?: OppTaskSortEnum,
}

export interface OpportunityNoteSearchParams {
  query: string,
  sortBy?: OppNoteSortEnum,
}
