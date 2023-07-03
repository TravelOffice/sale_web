import { Note } from './note//Note';
import { Task } from './task/Task';

export enum BookingStatusEnum {
  INITIALIZED = 'INITIALIZED',
  CONFIRMED = 'CONFIRMED',
  IN_PROCESS = 'IN_PROCESS',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export enum BookingPaymentStatusEnum {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
}

export enum BookingTourTypeEnum {
  SOLO = 'SOLO',
  SHARED = 'SHARED',
  GROUP = 'GROUP',
}

export type BookingStatus = keyof typeof BookingStatusEnum;
export type BookingPaymentStatus = keyof typeof BookingPaymentStatusEnum;
export type BookingTourType = keyof typeof BookingTourTypeEnum;

export interface Booking {
  code: string, // Format BK+<number>
  tourLeadId?: string, // Sk value of Lead item
  customerId: string, // Sk value of customer item
  customerInfo: { // customer information at the time booking created
    phone: string
    email: string
  },
  tourType: BookingTourType,
  deletedAt?: number,
  deletedBy?: string,
  notes?: Note[],
  tasks?: Task[],
  status: BookingStatus,
  paymentStatus: BookingPaymentStatus,
  createdAt: number,
  updatedAt: number,

  /**
   * TODO: Temporary attributes
   * These attrs will be updated later
   */
  requestedCode?: string,
  bookingCode?: string,
  labelId?: string,
  sourceId?: string,
  creatorId?: string,
  creatorName?: string,
  followerId?: string,
  requestStatus?: string,
  baseTotal?: number,
  baseTotalAfterVAT?: number,
  totalBonusSale?: number,
  promoCode?: string,
  discountMoney?: number,
  discountPercent?: number,
  totalPayment?: number,
  // role
  totalPaid?: number,
  description?: string,
  checkin?: number, // DateTime
  checkout?: number, // DateTime
  bookingAt?: number, // DateTime
  waitingAt?: number, // Time for waiting payment
  waitingExpiredAt?: number, // The time resavation expired
  doneAt?: string,
  canceledAt?: number,
  canceledReason?: string,
  canceledNote?: string,
  canceledBy?: string,
  canceledAtPhase?: string,
  // success // executiveNote // guideRecashMoney // commission
  totalPax?: number, // Total travellers
  // keepBonus // taxId // isBusiness // executiveStatus
  // executiveAt // roomHoldNumber // vatStatus // vatFee
  /** End temporary section */
}

export const bookingStatuses = Object.keys(BookingStatusEnum) as Array<BookingStatus>;
export const tourTypes = Object.keys(BookingTourTypeEnum) as Array<BookingTourType>;
