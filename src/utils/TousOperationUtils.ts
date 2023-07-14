import i18n from '@config/i18n';
import { DepartureTour, ExtendedDepartureTour } from '@domain/entities/tour';
import { DepartureTourFilterParams } from '@features/ToursOperation/DepartureTour/components/DepartureTourFilter';
import moment from 'moment';

export function generateI18nForDepartureTour(type: string) {
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
  return `/apps/tours/${departureTour.code}/operate`;
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
  const status = generateI18nForDepartureTour(depTour.operationStatus);
  let searchableStr = `${depTour.name} ${depTour.code} ${status} `;
  searchableStr += `${moment(depTour.startDate).format('DD/MM/YYYY')} `;
  searchableStr += `${depTour.startingLocationName} - ${depTour.endingLocationName} `;
  return searchableStr.toLowerCase();
}
