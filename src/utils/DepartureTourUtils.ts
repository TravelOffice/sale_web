import i18n from 'i18next';
import { DepartureTour } from '@domain/entities/tour';
import { DepartureTourFilterParams } from '@features/Tour/Departure/components/DepartureTourFilter';
import { isDateInRange } from '@utils/DateUtils';

/**
 * Generates an internationalized translation for tour-template-related content
 * based on the specified type.
 *
 * @param type - The type parameter used to determine the translation key.
 * @returns The internationalized translation string.
 */
export function generateI18nForDepartureTour(type: string) {
  const key = `DEPARTURE_TOUR.${type}`;
  return i18n.t(key);
}

/**
 * Filters an array of tour departure based on the provided filter parameters.
 *
 * @param allDepartureTours - An array of tour departure to filter.
 * @param params - The filter parameters used to determine which tour departure to include.
 * @returns An array of filtered tour departure.
 */
export function filterDepartureTours(
  allDepartureTours: DepartureTour[],
  params: DepartureTourFilterParams,
) {
  const {
    name, type, startingLocation, endingLocation, dateRange,
  } = params;

  return allDepartureTours.filter(
    (item: DepartureTour) => {
      if (type && !item.type.includes(type)) return false;
      if (name && !item.name.toLowerCase().includes(name.toLowerCase())) return false;
      if (startingLocation
        && !item.startingLocation.toLowerCase().includes(startingLocation.toLowerCase())) {
        return false;
      }
      if (endingLocation
        && !item.endingLocation.toLowerCase().includes(endingLocation.toLowerCase())) {
        return false;
      }
      // Filter by dueDateRange
      if (dateRange && dateRange.length === 2) {
        return isDateInRange(item.startDate, dateRange);
      }
      return true;
    },
  );
}

/**
 * Generates an editable URL for the specified tour departure.
 *
 * @param departureTour - The tour departure object for which to generate the URL.
 * @returns The editable URL for the tour departure.
 */
export function generateEditableUrlForDepartureTour(departureTour: DepartureTour) {
  return `/apps/tours/departure/${departureTour.code}/edit`;
}
