import i18n from '@config/i18n';
import {
  Booking, BookingStatus, BookingStatusEnum, tourTypes,
} from '@domain/entities/booking/Booking';
import { BookingFilterParams } from '@features/Booking/components/BookingFilter';
import moment from 'moment';
import * as yup from 'yup';
import { Service } from '@domain/entities/booking/Service';

/**
 * Checks if the assignee matches the specified criteria in the given booking.
 *
 * @param booking - The booking object to check.
 * @param assigneeToCheck - The assignee criteria to match against. (optional)
 * @returns A boolean indicating whether the assignee matches the criteria.
 */
export function checkAssignee(booking: Booking, assigneeToCheck?: string) {
  if (!assigneeToCheck) return true;
  const { assigneeId } = booking;
  if (!assigneeId) return false;
  return assigneeId.toLowerCase().includes(assigneeToCheck.toLowerCase());
}

/*
 * Filters an array of leads based on the provided filter parameters.
 *
 * @param allLeads - An array of leads to filter.
 * @param params - The filter parameters used to determine which leads to include.
 * @returns An array of filtered leads.
 */
export function filterBookings(bookings: Booking[], params: BookingFilterParams) {
  return bookings.filter((booking) => {
    const {
      code,
      status,
    } = params;
    if (code && !booking.code.toLowerCase().includes(code.toLowerCase())) return false;
    return !(status && booking.bookingStatus !== status);
  });
}

/**
 * Generates an internationalized translation for booking-related content
 * based on the specified type.
 *
 * @param type
 * @param type - The type parameter used to determine the translation key.
 * @returns The internationalized translation string.
 */
export function generateI18nForBooking(type: string) {
  const key = `BOOKING.${type}`;
  return i18n.t(key).toUpperCase();
}

/**
 * Generates an editable URL for the specified booking.
 *
 * @param booking - The booking object for which to generate the URL.
 * @returns The editable URL for the booking.
 */
export function generateEditableUrlForBooking(booking: Booking) {
  return `/apps/bookings/${booking.code}/edit`;
}

/**
 * Generates a URL to create a booking from a lead.
 * @param leadId Lead id
 * @returns Url to create booking from lead
 */
export function generateCreateBookingFromLeadUrl(leadId: string) {
  return `/apps/bookings/create-from-lead?leadId=${leadId}`;
}

/**
 * Convert booking data to searchable string
 * @param booking Booking data
 * @returns Searchable string
 */
export function toSearchableContent(booking: Booking) {
  // Build serachable string
  const status = generateI18nForBooking(booking.bookingStatus);
  let searchableStr = `${booking.code} ${status} `;
  const {
    lead, customer, tourTemplate, notes,
  } = booking;
  if (customer) {
    searchableStr += `${customer.name} ${customer.primaryPhoneNumber} `;
  }

  searchableStr += `${moment(booking.departureDate).format('DD/MM/YYYY')} `;
  searchableStr += (notes && notes.length) ? notes.pop()!.description : i18n.t('BOOKING.NO_NOTE').toString();
  if (tourTemplate) {
    searchableStr += `${moment(booking.departureDate).add(booking.tourTemplate?.durationInDays, 'days').format('DD/MM/YYYY')} `;
  }

  if (lead) searchableStr += lead.sourceName;
  return searchableStr.toLowerCase();
}

const validateServiceSchema = yup.object().shape({
  serviceName: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.SERVICE_NAME') })),
  price: yup
    .number()
    .integer()
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.SERVICE_PRICE'), value: 0 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.SERVICE_PRICE') })),
  quantity: yup
    .number()
    .integer()
    .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', { field: i18n.t('TOUR_TEMPLATE.SERVICE_PRICE'), value: 0 }))
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOUR_TEMPLATE.SERVICE_PRICE') })),
});

export const updateBookingSchema = yup.object().shape({
  departureDate: yup
    .date()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.DEPARTURE_DATE') })),
  tourType: yup
    .string()
    .oneOf(tourTypes)
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.TOUR_TYPE') })),
  tourTemplateId: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.TOUR_TEMPLATE') })),
  assigneeId: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.ASSIGNEE') })),
  sourceId: yup
    .string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.SOURCE') })),
  services: yup.array().of(validateServiceSchema).optional(),
});

export const confirmBookingSchema = yup.object().shape({
  departureTourId: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('DEPARTURE_TOUR.DEPARTURE_TOUR') })),
  totalPaid: yup.number().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.TOTAL_PAID') })),
});

export const paymentPendingSchema = yup.object().shape({
  waitingExpiredAt: yup.date().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.WAITING_EXPIRED_AT') })),
});

export const cancelBookingSchema = yup.object().shape({
  canceledReason: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('BOOKING.FORM.CANCELED_REASON') })),
});

export function calculateBeforeVAT(price: number, quantity: number): number {
  return price * quantity;
}

export function calculateAfterVAT(price: number, quantity: number, tax: number): number {
  const result = price * quantity * (100 + tax);
  return result / 100;
}

export function calculatePaymentTotal(services: Service[]): number {
  let total = 0;
  if (services) {
    services.forEach((service) => {
      total += calculateAfterVAT(service.price, service.quantity, service.tax);
    });
  }
  return total;
}

export function isCanceledBooking(status: BookingStatus) {
  return status === BookingStatusEnum.CANCELED;
}

export function isEditableBooking(status: BookingStatus) {
  return status !== BookingStatusEnum.CANCELED
    && status !== BookingStatusEnum.COMPLETED;
}
