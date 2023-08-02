import { Service } from '@domain/entities/booking/Service';
import { Task } from '../task/Task';
import { Note } from '../note/Note';

export enum SexType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum HonorificType {
  MR_YOUNG = 'MR_YOUNG',
  MRS_YOUNG = 'MRS_YOUNG',
  MR_OLD = 'MR_OLD',
  MRS_OLD = 'MRS_OLD',
}

export enum CustomerLevel {
  STANDARD = 'STANDARD',
  VIP = 'VIP',
  VVIP = 'VVIP',
}

export enum SourceType {
  SOCIAL = 'SOCIAL',
  WEBSITE = 'WEBSITE',
  ADVERTISEMENT = 'ADVERTISEMENT',
  EVENT = 'EVENT',
  OTHER = 'OTHER',
}

export enum MaritalStatus {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
  // Other: user can input custom value
}

export enum CustomerType {
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS',
}

interface LatesBooking {
  id: string,
  creatorId: string,
  creatorName: string,
  createdAt: number,
}

export interface Customer {
  code: string,
  name: string,
  honorific?: HonorificType,
  birthday?: string,
  nationality?: string,
  sex?: SexType,
  maritalStatus?: MaritalStatus,
  primaryPhoneNumber: string,
  otherPhoneNumbers?: Array<string>,
  email: string,
  country?: string,
  province?: string,
  district?: string,
  ward?: string,
  address: string,
  tags?: Array<string>,
  source: SourceType,
  tasks?: Task[],
  notes?: Note[],
  creatorId?: string,
  creatorName?: string,
  assigneeId?: string,
  assigneeName?: string,
  interest?: string,
  group?: string,
  genitive?: string,
  taxCode?: string,
  level: CustomerLevel,
  socialLink?: string,
  revenue: number,
  createdAt: number,
  updatedAt: number,
  latestBooking?: LatesBooking,
}

export interface CustomerWithBookingData extends Customer {
  notes: Note[],
  assigneeName: string,
  assigneeId: string,
  services: Service[],
  totalPax: number
}

export type CreateCustomerFormData = Pick<Customer,
'email' |
'primaryPhoneNumber' |
'name' |
'address' |
'sex' |
'honorific' |
'level' |
'socialLink'
>;

export type UpdateCustomerFormData = Pick<Customer,
'email' |
'primaryPhoneNumber' |
'name' |
'assigneeId' |
'address' |
'sex' |
'honorific' |
'level' |
'socialLink' |
'birthday' |
'source' |
'maritalStatus' |
'interest' |
'group' |
'genitive' |
'taxCode' |
'tags'
>;
