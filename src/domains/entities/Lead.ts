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
export enum LeadStatusEnum {
  NEW = 'NEW',
  QUALIFYING = 'QUALIFYING',
  QUALIFIED = 'QUALIFIED',
  TAKING_CARE = 'TAKING_CARE',
}
export enum CustomerStatusEnum {
  NEW = 'New',
  TRADING = 'TRADING',
  TRADED = 'TRADED',
}
export enum MaritalEnum {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
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
export type LeadStatusType = keyof typeof LeadStatusEnum;
export type CustomerStatusType = keyof typeof CustomerStatusEnum;
export type MaritalStatusType = keyof typeof MaritalEnum;
export type LeadType = keyof typeof LeadEnum;
export type SourceType = keyof typeof SourceEnum;

export interface Lead {
  primaryPhoneNumber: string,
  name: string,
  vocative: VocativeType,
  birthday?: string,
  nationality: string,
  sex: SexType,
  maritalStatus?: MaritalStatusType,
  otherPhoneNumbers: Array<string>,
  email?: string,
  country: string,
  province?: string,
  district?: string,
  ward?: string,
  address?: string,
  status: LeadStatusType,
  createdAt?: number,
  updatedAt?: number,
  tags?: Array<string>,
  creatorId?: string,
  creatorName?: string,
  assigneeId?: string,
  assigneeName?: string,
  source: SourceType,
  enabled: boolean,
  type: LeadEnum.LEAD,
}

export type Customer = Omit<Lead, 'status' | 'type'> & { status: CustomerStatusType, type: LeadEnum.CUSTOMER };

export interface CreateUpdateLeadResponse {
  lead?: Lead,
}

export interface FetchAssignedLeadResponse {
  leads?: Lead[],
}

export interface CreateUpdateCustomerResponse {
  customer?: Customer,
}

export interface FetchAssignedCustomerResponse {
  customers?: Customer[],
}

export const leadSexes : SexType[] = Object.keys(SexEnum) as Array<SexType>;
export const leadVocatives : VocativeType[] = Object.keys(VocativeEnum) as Array<VocativeType>;
export const leadStatuses : LeadStatusType[] = Object.keys(LeadStatusEnum) as Array<LeadStatusType>;
export const leadTypes : LeadType[] = Object.keys(LeadEnum) as Array<LeadType>;
export const leadMaritals : MaritalStatusType[] = Object.keys(MaritalEnum) as
  Array<MaritalStatusType>;
export const leadSources : SourceType[] = Object.keys(SourceEnum) as Array<SourceType>;
export const customerStatuses :
CustomerStatusType[] = Object.keys(CustomerStatusEnum) as Array<CustomerStatusType>;
