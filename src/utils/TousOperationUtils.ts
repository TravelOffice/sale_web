import i18n from '@config/i18n';
import { RoleEnum, User } from '@domain/entities/User';
import { DepartureTour, ExtendedDepartureTour } from '@domain/entities/tour';
import { DepartureTourFilterParams } from '@features/ToursOperation/DepartureTour/components/DepartureTourFilter';
import moment, { Moment } from 'moment';
import { Estimation } from '@domain/entities/tour/Estimation';
import { DailyKey } from '@domain/entities/tour/TourPlan';
import { numberArrayOf } from '@utils/ArrayUtils';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { Booking } from '@domain/entities/booking/Booking';

export function generateI18nForDepartureTourOperation(type: string) {
  const key = `TOURS_OPERATION.${type}`;
  return i18n.t(key).toUpperCase();
}

/**
 * Generates an editable URL for the specified booking.
 *
 * @param departureTour - The departure tour object for which to generate the URL.
 * @returns The editable URL for the departure tour.
 */
export function generateOperationUrlForTour(departureTour: DepartureTour) {
  return `/apps/tours-operation/${departureTour.code}/operate`;
}

/**
 * Generates an editable URL for the specified booking.
 * @param departureTour - The departure tour object for which to generate the URL.
 * @returns The editable URL for the departure tour.
 *
 * @example
 * const url = generateEditableUrlForTour(departureTour);
 * console.log(url);
 * // => /apps/tours/departure/123/edit
 */
export function generateEditableUrlForTour(departureTour: DepartureTour) {
  return `/apps/tours/departure/${departureTour.code}/edit`;
}

export function canUserBeOperator(user: User) {
  return user.roles.includes(RoleEnum.OPERATOR) || user.roles.includes(RoleEnum.OPERATOR_MANAGER);
}

export function filterDepartureTours(
  depTours: ExtendedDepartureTour[],
  params: DepartureTourFilterParams,
) {
  return depTours.filter((depTour) => {
    const {
      code,
      name,
      operationStatus,
      startingLocation,
      endingLocation,
    } = params;

    if (code && !depTour.code.toLowerCase().includes(code.toLowerCase())) return false;
    if (name && !depTour.name.toLowerCase().includes(name.toLowerCase())) return false;
    if (startingLocation && depTour.startingLocation !== startingLocation) return false;
    if (endingLocation && depTour.endingLocation !== endingLocation) return false;
    return !(operationStatus && depTour.operationStatus !== operationStatus);
  });
}

/**
 * Convert departure tour data to searchable string
 * @param depTour Departure tour data
 * @returns Searchable string
 */
export function toSearchableContent(depTour: ExtendedDepartureTour) {
  // Build serachable string
  const status = generateI18nForDepartureTourOperation(depTour.operationStatus);
  let searchableStr = `${depTour.name} ${depTour.code} ${status} `;
  searchableStr += `${moment(depTour.startDate).format('DD/MM/YYYY')} `;
  searchableStr += `${depTour.startingLocationName} - ${depTour.endingLocationName} `;
  return searchableStr.toLowerCase();
}

/**
 * Generates an internationalized translation for tour-operation-related content
 * based on the specified type.
 *
 * @param type - The type parameter used to determine the translation key.
 * @returns The internationalized translation string.
 */
export function generateI18nForTourOperation(type: string) {
  const key = `TOURS_OPERATION.${type}`;
  return i18n.t(key);
}

export function calTemporaryPriceEstimation(estimation: Estimation) {
  return estimation.estimatedPrice * estimation.estimatedQuantity;
}

export function calVATEstimation(estimation: Estimation) {
  const vat = calTemporaryPriceEstimation(estimation) * estimation.vat;
  return vat / 100;
}

export function calPaymentEstimation(estimation: Estimation) {
  return calTemporaryPriceEstimation((estimation)) + calVATEstimation(estimation);
}

export function generateI18nForDailyTourPlanKey(key: DailyKey) {
  const day = key.split('_')[1];
  return i18n.t('TOURS_OPERATION.TOUR_PLAN_DAY', { day });
}

export function convertTourPlanDayToMoment(tour: DepartureTour, key: DailyKey) {
  const day = parseInt(key.split('_')[1], 10);
  return moment(tour.startDate).add(day - 1, 'days');
}

export function correctDateTimeOfTourPlan(baseDate: Moment, startTime: number, endTime: number) {
  const startDate = moment(baseDate).startOf('D')
    .set('h', moment(startTime).get('h'))
    .set('m', moment(startTime).get('m'))
    .toDate()
    .getTime();
  const endDate = moment(baseDate).startOf('D')
    .set('h', moment(endTime).get('h'))
    .set('m', moment(endTime).get('m'))
    .toDate()
    .getTime();
  return { startDate, endDate };
}

type DayOptions = Array<{ label: string, value: DailyKey }>;

export function generateDayOptions(tour: DepartureTour): DayOptions {
  return numberArrayOf(Math.max(tour.durationInDays, tour.durationInNights)).map((value) => ({
    label: generateI18nForDailyTourPlanKey(`DAY_${value + 1}`),
    value: `DAY_${value + 1}`,
  }));
}

export function getAllowedOperationStatus(currentStatus: TourOperationStatus) {
  if (currentStatus === TourOperationStatus.WAITING_FOR_OPERATION) {
    return [TourOperationStatus.PROCESSING];
  }
  if (currentStatus === TourOperationStatus.PROCESSING) {
    return [TourOperationStatus.TRANSFERRED];
  }

  if (currentStatus === TourOperationStatus.TRANSFERRED) {
    return [TourOperationStatus.COMPLETED];
  }

  // Fallback to empty array, which means no allowed status
  return [];
}

// Calculate total paid amount of a tour from paid amount of each booking
export function calculatePaidAmountTotalOfTour(booking: Booking[]): number {
  return booking.reduce((total, item) => (item.totalPaid ? total + item.totalPaid : total), 0);
}

// Calculate total paid amount of a tour from paid amount of each booking
export function calculateAmountTotalOfTour(booking: Booking[]): number {
  return booking.reduce((total, item) => (item.totalPaid ? total + item.totalPaid : total), 0);
}
