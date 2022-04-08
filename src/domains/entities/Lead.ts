export enum SexEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
export enum VocativeEnum {
  MR_YOUNG = 'MR_YOUNG',
  MRS_YOUNG = 'MRS_YOUNG',
  MR_OLD = 'MR_OLD',
  MRS_OLD = 'MRS_OLD',
}
export enum StatusEnum {
  NEW = 'NEW',
  QUALIFYING = 'QUALIFYING',
  QUALIFIED = 'QUALIFIED',
  TAKING_CARE = 'TAKING_CARE',
  TRADING = 'TRADING',
  TRADED = 'TRADED',
}
export enum MaritalEnum {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
}
export enum LeadEnum {
  LEAD = 'LEAD',
  CUSTOMER = 'CUSTOMER',
}
export enum SourceEnum {
  SOCIAL = 'SOCIAL',
  WEBSITE = 'WEBSITE',
  ADVERTISEMENT = 'ADVERTISEMENT',
  EVENT = 'EVENT',
  OTHER = 'OTHER',
}

export type SexType = keyof typeof SexEnum;
export type VocativeType = keyof typeof VocativeEnum;
export type StatusType = keyof typeof StatusEnum;
export type MaritalStatus = keyof typeof MaritalEnum;
export type LeadType = keyof typeof LeadEnum;
export type SourceType = keyof typeof SourceEnum;

export interface Lead {
  primaryPhoneNumber: string,
  name: string,
  vocative: VocativeType,
  birthday?: string,
  nationality: string,
  sex: SexType,
  maritalStatus?: MaritalStatus,
  otherPhoneNumbers: Array<string>,
  email?: string,
  country: string,
  province?: string,
  district?: string,
  ward?: string,
  address?: string,
  status: StatusType,
  createAt?: string,
  updateAt?: string,
  tags?: Array<string>,
  creatorId?: string,
  creatorName?: string,
  assigneeId?: string,
  assigneeName?: string,
  source: SourceType,
  enabled: boolean,
  type: LeadType,
}

export interface CreateUpdateLeadResponse {
  lead?: Lead,
  errorMsg?: string
}
