import i18n from '@config/i18n';
import { Booking } from '@domain/entities/booking/Booking';
import { BookingFilterParams } from '@features/Booking/components/BookingFilter';
import moment from 'moment';

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
  return `/apps/booking/${booking.code}/edit`;
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
