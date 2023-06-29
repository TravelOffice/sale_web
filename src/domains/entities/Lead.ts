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
export enum LeadStatus {
  NEW = 'NEW',
  PROCESSING = 'PROCESSING',
  CLOSED = 'CLOSED',
  CANCEL = 'CANCEL',
}

export interface Lead {
  code: string,

  // Contact
  name: string,
  honorific: HonorificType,
  email: string,
  phoneNumber: string,
  address?: string,
  customerId?: string,

  // Desire
  tourTemplateId?: string,
  tourTemplateName?: string,
  desiredTour?: string,
  tourType?: string,
  type: string,
  departure: string,
  startDate: string,
  description?: string,
  numberOfAdultPassengers: number,
  numberOfChildrenPassengers: number,

  // Manage
  leadStatus: LeadStatus,
  tags: Array<string>,
  creatorId: string,
  creatorName: string,
  assigneeId?: string,
  assigneeName?: string,
  sourceId: string,
  sourceName: string,
  cancelledReason?: string,
  createdAt: number,
  updatedAt: number,
}
