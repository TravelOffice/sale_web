import { useQuery } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import { useMemo } from 'react';

export function useDepartureTours() {
  return useQuery(['departures-tour'], tourPresenter.getAllDepartureTours);
}

export function useDepartureTourOptions() {
  const { data: departureTours } = useDepartureTours();
  return useMemo(() => {
    if (!departureTours) return [];
    return departureTours.map((departureTour) => ({
      label: departureTour.name,
      value: departureTour.code,
    }));
  }, [departureTours]);
}

export function useEstimations(tourId: string) {
  return useQuery(['estimations', tourId], async () => tourPresenter.getEstimations(tourId));
}
