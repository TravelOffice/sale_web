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

export function useEstimationOptions(tourId: string) {
  const { data: estimations } = useEstimations(tourId);
  return useMemo(() => {
    if (!estimations) return [];
    return estimations.map((estimation) => ({
      label: estimation.name,
      value: estimation.code,
    }));
  }, [estimations]);
}

export function useDepartureTour(id: string) {
  return useQuery({
    queryKey: ['departures-tour', id],
    queryFn: async () => tourPresenter.getDepartureTour(id),
  });
}

export function useTourPlan(tourId: string) {
  return useQuery({
    queryKey: ['tour-plan', tourId],
    queryFn: async () => tourPresenter.getTourPlan(tourId),
  });
}

export function useAllowedTourOperationStatuses() {
  return useMemo(() => {

  }, []);
}
