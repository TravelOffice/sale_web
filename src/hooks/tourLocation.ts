import { useQuery } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import { useMemo } from 'react';

export function useTourLocations() {
  return useQuery(['tourLocations'], tourPresenter.getAllToursLocation);
}

export function useTourLocationOptions() {
  const { data } = useTourLocations();
  return useMemo(() => {
    if (!data) return [];
    return data.map((tourLocation) => ({
      label: tourLocation.name,
      value: tourLocation.code,
    }));
  }, [data]);
}
