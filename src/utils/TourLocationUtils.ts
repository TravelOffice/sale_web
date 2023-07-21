import { TourLocation } from '@domain/entities/tour';

export function findTourLocation(tourLocations: TourLocation[], code: string) {
  return tourLocations.find((tourLocation) => tourLocation.code === code);
}

export function findTourLocationNameByCode(tourLocations: TourLocation[], code: string) {
  const tourLocation = findTourLocation(tourLocations, code);
  return tourLocation?.name || '';
}
