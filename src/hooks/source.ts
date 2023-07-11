import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { sourcePresenter } from '@adapter/presenters';

export function useSources() {
  return useQuery(['sources'], sourcePresenter.getAll);
}

export function useSourceOptions() {
  const { data } = useSources();
  return useMemo(() => {
    if (!data) return [];
    return data.map((source) => ({
      label: source.name,
      value: source.code,
    }));
  }, [data]);
}
