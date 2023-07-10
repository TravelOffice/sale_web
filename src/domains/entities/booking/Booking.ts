import { Service } from '@domain/entities/booking/Service';
import { Note } from '@domain/entities/note/Note';
import { Task } from '@domain/entities/task/Task';
import { Lead } from '@domain/entities/lead/Lead';
import { Customer } from '@domain/entities/customer/Customer';
import { TourTemplate } from '@domain/entities/TourTemplate';

export enum BookingStatusEnum {
  INITIALIZED = 'INITIALIZED',
  CONFIRMED = 'CONFIRMED',
  IN_PROCESS = 'IN_PROCESS',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
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
  customerId: string, // Sk value of Customer item
  customerInfo: { // Customer information at the time booking created
    phone: string
    email: string
  },
  tourType: BookingTourType,
  deletedAt?: number,
  deletedBy?: string,
  notes?: Note[],
  tasks?: Task[],
  bookingStatus: BookingStatus,
  paymentStatus: BookingPaymentStatus,
  assigneeId?: string,
  canceledAt?: number,
  canceledReason?: string,
  canceledNote?: string,
  canceledBy?: string,
  canceledAtPhase?: string,
  services: Service[],
  tourTemplateId?: string,
  departureDate?: string,
  readonly createdAt: number,
  readonly updatedAt: number,
  readonly totalPaid?: number, // Number of amount user has been paid
  readonly totalPayment?: number, // Number of amount user has to pay

  /**
   * Booking related items
   * Such as Lead, Customer, TourTemplate
   */
  lead?: Lead,
  customer?: Customer,
  tourTemplate?: TourTemplate,

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
  requestStatus?: string,
  baseTotal?: number,
  baseTotalAfterVAT?: number,
  totalBonusSale?: number,
  promoCode?: string,
  discountMoney?: number,
  discountPercent?: number,
  // role
  description?: string,
  checkin?: number, // DateTime
  checkout?: number, // DateTime
  bookingAt?: number, // DateTime
  waitingAt?: number, // Time for waiting payment
  waitingExpiredAt?: number, // The time reservation expired
  doneAt?: string,
  // success // executiveNote // guideRecashMoney // commission
  totalPax?: number, // Total travellers
  // keepBonus // taxId // isBusiness // executiveStatus
  // executiveAt // roomHoldNumber // vatStatus // vatFee
  /** End temporary section */
}

export const bookingStatuses = Object.keys(BookingStatusEnum) as Array<BookingStatus>;
// eslint-disable-next-line max-len
export const bookingPaymentStatuses = Object.keys(BookingPaymentStatusEnum) as Array<BookingPaymentStatusEnum>;
export const tourTypes = Object.keys(BookingTourTypeEnum) as Array<BookingTourType>;
export const statusTransitionRules = [
  `${BookingStatusEnum.INITIALIZED}-${BookingStatusEnum.IN_PROCESS}`,
  `${BookingStatusEnum.IN_PROCESS}-${BookingStatusEnum.PAYMENT_PENDING}`,
  `${BookingStatusEnum.IN_PROCESS}-${BookingStatusEnum.CONFIRMED}`,
  `${BookingStatusEnum.IN_PROCESS}-${BookingStatusEnum.CANCELED}`,
  `${BookingStatusEnum.PAYMENT_PENDING}-${BookingStatusEnum.CANCELED}`,
  `${BookingStatusEnum.PAYMENT_PENDING}-${BookingStatusEnum.CONFIRMED}`,
  `${BookingStatusEnum.CONFIRMED}-${BookingStatusEnum.CANCELED}`,
  `${BookingStatusEnum.CONFIRMED}-${BookingStatusEnum.COMPLETED}`,
  `${BookingStatusEnum.CANCELED}-${BookingStatusEnum.INITIALIZED}`,
];
